/**
 * frontend/src/cdp.ts
 *
 * a small chrome devtools protocol client for the inspector websocket the api proxies (works in any browser)
 */

export interface CallFrame {
    callFrameId: string;
    functionName: string;
    location: { scriptId: string; lineNumber: number; columnNumber?: number };
    url: string;
    scopeChain: { type: string; name?: string; object: RemoteObject }[];
    this: RemoteObject;
}

export interface RemoteObject {
    type: string;
    subtype?: string;
    className?: string;
    value?: unknown;
    description?: string;
    objectId?: string;
    preview?: { properties: { name: string; value?: string; type: string; subtype?: string }[]; overflow: boolean; description?: string };
}

export interface PropertyDescriptor {
    name: string;
    value?: RemoteObject;
    get?: RemoteObject;
    enumerable?: boolean;
}

export interface PausedEvent {
    callFrames: CallFrame[];
    reason: string;
    data?: { description?: string };
}

type EventHandler = (params: unknown) => void;

export class CdpError extends Error {}

/**
 * one connection to one inspector session
 */
export class CdpClient {
    private socket: WebSocket;
    private nextId = 1;
    private pending = new Map<number, { resolve: (value: unknown) => void; reject: (error: Error) => void }>();
    private handlers = new Map<string, Set<EventHandler>>();
    readonly scripts = new Map<string, string>(); // scriptId -> url
    readonly sourceMaps = new Map<string, string>(); // scriptId -> sourceMapURL (inline data url for deno's transpiled typescript)
    readonly ready: Promise<void>;
    closed = false;
    onClose: (() => void) | null = null;

    constructor(url: string) {
        this.socket = new WebSocket(url);
        this.ready = new Promise((resolve, reject) => {
            this.socket.onopen = () => resolve();
            this.socket.onerror = () => reject(new CdpError('could not connect to the inspector'));
        });
        this.socket.onmessage = (event) => this.receive(JSON.parse(event.data));
        this.socket.onclose = () => {
            this.closed = true;
            for (const { reject } of this.pending.values()) reject(new CdpError('inspector disconnected'));
            this.pending.clear();
            this.onClose?.();
        };
        this.on('Debugger.scriptParsed', (params) => {
            const { scriptId, url, sourceMapURL } = params as { scriptId: string; url: string; sourceMapURL?: string };
            this.scripts.set(scriptId, url);
            if (sourceMapURL) this.sourceMaps.set(scriptId, sourceMapURL);
        });
    }

    send<T = unknown>(method: string, params?: Record<string, unknown>): Promise<T> {
        if (this.closed) return Promise.reject(new CdpError('inspector disconnected'));
        const id = this.nextId++;
        return new Promise<T>((resolve, reject) => {
            this.pending.set(id, { resolve: resolve as (value: unknown) => void, reject });
            this.socket.send(JSON.stringify({ id, method, params }));
        });
    }

    on(method: string, handler: EventHandler): () => void {
        if (!this.handlers.has(method)) this.handlers.set(method, new Set());
        this.handlers.get(method)!.add(handler);
        return () => this.handlers.get(method)?.delete(handler);
    }

    close(): void {
        if (!this.closed) this.socket.close();
    }

    private receive(message: { id?: number; result?: unknown; error?: { message: string }; method?: string; params?: unknown }) {
        if (message.id !== undefined) {
            const waiting = this.pending.get(message.id);
            this.pending.delete(message.id);
            if (!waiting) return;
            if (message.error) waiting.reject(new CdpError(message.error.message));
            else waiting.resolve(message.result);
            return;
        }
        if (message.method) {
            for (const handler of this.handlers.get(message.method) ?? []) handler(message.params);
        }
    }
}

/** short human readable rendering of a remote value */
export const describeValue = (value: RemoteObject | undefined): string => {
    if (!value) return 'undefined';
    if (value.type === 'string') return JSON.stringify(value.value);
    if (value.type === 'undefined') return 'undefined';
    if (value.value !== undefined) return String(value.value);
    if (value.preview) {
        const inner = value.preview.properties.map((property) => (value.subtype === 'array' ? property.value : `${property.name}: ${property.value}`)).join(
            ', ',
        );
        const open = value.subtype === 'array' ? '[' : '{';
        const close = value.subtype === 'array' ? ']' : '}';
        return `${value.subtype === 'array' ? '' : (value.className && value.className !== 'Object' ? value.className + ' ' : '')}${open}${inner}${
            value.preview.overflow ? ', …' : ''
        }${close}`;
    }
    return value.description ?? value.type;
};

/** the websocket url for a debug token, honouring a remote api base */
export const inspectorUrl = (token: string, apiBase = ''): string => {
    const base = apiBase ? new URL(apiBase) : location;
    const secure = base.protocol === 'https:';
    return `${secure ? 'wss' : 'ws'}://${base.host}/api/debug/ws/${token}`;
};

/**
 * deno runs transpiled javascript, so v8 line numbers differ from the typescript file; the inline source map
 * v8 reports with each script translates both ways (generated ↔ original, 0-based lines)
 */
export class SourceMap {
    /** generated line -> segments sorted by generated column */
    private lines = new Map<number, { column: number; originalLine: number; originalColumn: number }[]>();
    /** original line -> smallest generated line that maps to it */
    private byOriginal = new Map<number, number>();

    constructor(mappings: string) {
        const BASE64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let generatedLine = 0;
        let source = 0, originalLine = 0, originalColumn = 0;
        for (const line of mappings.split(';')) {
            let column = 0;
            if (line) {
                for (const segment of line.split(',')) {
                    const values: number[] = [];
                    let shift = 0, value = 0;
                    for (const char of segment) {
                        const digit = BASE64.indexOf(char);
                        value += (digit & 31) << shift;
                        if (digit & 32) {
                            shift += 5;
                        } else {
                            values.push(value & 1 ? -(value >> 1) : value >> 1);
                            shift = 0;
                            value = 0;
                        }
                    }
                    column += values[0] ?? 0;
                    if (values.length >= 4) {
                        source += values[1];
                        originalLine += values[2];
                        originalColumn += values[3];
                        if (source === 0) {
                            if (!this.lines.has(generatedLine)) this.lines.set(generatedLine, []);
                            this.lines.get(generatedLine)!.push({ column, originalLine, originalColumn });
                            const existing = this.byOriginal.get(originalLine);
                            if (existing === undefined || generatedLine < existing) this.byOriginal.set(originalLine, generatedLine);
                        }
                    }
                }
            }
            generatedLine++;
        }
    }

    /** parses the inline (data url) or json source map v8 reported */
    static fromUrl(sourceMapUrl: string): SourceMap | null {
        try {
            const match = sourceMapUrl.match(/^data:application\/json[^,]*;base64,(.*)$/);
            if (!match) return null;
            const json = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(match[1]), (c) => c.charCodeAt(0))));
            return typeof json.mappings === 'string' ? new SourceMap(json.mappings) : null;
        } catch {
            return null;
        }
    }

    /** original 0-based line for a generated position */
    toOriginal(generatedLine: number, generatedColumn = 0): number | null {
        const segments = this.lines.get(generatedLine);
        if (!segments?.length) return null;
        let best = segments[0];
        for (const segment of segments) {
            if (segment.column <= generatedColumn) best = segment;
            else break;
        }
        return best.originalLine;
    }

    /** generated 0-based line for an original line; falls back to the next original line that has code */
    toGenerated(originalLine: number): number | null {
        const direct = this.byOriginal.get(originalLine);
        if (direct !== undefined) return direct;
        let candidate: number | null = null;
        let candidateLine = Infinity;
        for (const [line, generated] of this.byOriginal) {
            if (line > originalLine && line < candidateLine) {
                candidateLine = line;
                candidate = generated;
            }
        }
        return candidate;
    }
}
