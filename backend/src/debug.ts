/**
 * backend/src/debug.ts
 *
 * one debug session at a time: the solution runs under deno's inspector and the api proxies the inspector
 * websocket so chrome devtools can attach through the same host (and tls) as everything else
 *
 * by alex prosser
 */

export interface DebugSession {
    token: string; // random, put in the websocket path because devtools cannot send headers
    wsUrl: string; // the child's inspector endpoint, e.g. ws://127.0.0.1:9229/<uuid>
    year: number;
    day: number;
    startedAt: string;
    /** open proxy connections, so the session can be torn down once the solution has finished */
    sockets: Set<WebSocket>;
}

let current: DebugSession | null = null;

export const DEBUG_PORT = Number(Deno.env.get('DEBUG_PORT') ?? 9229);

export const getDebugSession = (): DebugSession | null => current;

export const newDebugToken = (): string => {
    const bytes = new Uint8Array(24);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const registerDebugSession = (session: Omit<DebugSession, 'sockets'>): void => {
    current = { ...session, sockets: new Set() };
};

/** closes every attached debugger so the child (which waits for them) can exit */
export const disconnectDebugSession = (token: string): void => {
    if (current?.token !== token) return;
    for (const socket of current.sockets) {
        try {
            socket.close();
        } catch {
            // already closed
        }
    }
    current.sockets.clear();
};

export const clearDebugSession = (token: string): void => {
    if (current?.token !== token) return;
    disconnectDebugSession(token);
    current = null;
};

/**
 * bridges a client websocket (chrome devtools) to the child's inspector websocket
 */
export const proxyInspector = (request: Request, token: string): Response => {
    const session = current;
    if (!session || session.token !== token) return new Response('no debug session with that token', { status: 404 });

    const { socket: client, response } = Deno.upgradeWebSocket(request);
    const upstream = new WebSocket(session.wsUrl);
    const pending: (string | ArrayBuffer)[] = [];
    session.sockets.add(upstream);
    session.sockets.add(client);

    upstream.onopen = () => {
        for (const message of pending) upstream.send(message);
        pending.length = 0;
    };
    upstream.onmessage = (event) => {
        if (client.readyState === WebSocket.OPEN) client.send(event.data);
    };
    upstream.onclose = () => {
        session.sockets.delete(upstream);
        if (client.readyState === WebSocket.OPEN) client.close();
    };
    upstream.onerror = () => client.readyState === WebSocket.OPEN && client.close(1011, 'inspector connection failed');

    client.onmessage = (event) => {
        if (upstream.readyState === WebSocket.OPEN) upstream.send(event.data);
        else pending.push(event.data);
    };
    client.onclose = () => {
        session.sockets.delete(client);
        if (upstream.readyState <= WebSocket.OPEN) upstream.close();
    };
    client.onerror = () => upstream.readyState <= WebSocket.OPEN && upstream.close();

    return response;
};
