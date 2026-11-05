/**
 * backend/src/api/router.ts
 *
 * a tiny method + URLPattern router with json helpers
 *
 * by alex prosser
 */

export type Params = Record<string, string>;
export type Handler = (request: Request, params: Params) => Promise<Response> | Response;

/** an error whose message is safe to send back to the client */
export class HttpError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'HttpError';
    }
}

export const json = (data: unknown, status = 200, headers: HeadersInit = {}): Response =>
    new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...headers } });

export const text = (body: string, status = 200): Response => new Response(body, { status, headers: { 'content-type': 'text/plain; charset=utf-8' } });

export const readJson = async <T = Record<string, unknown>>(request: Request): Promise<T> => {
    if (!request.body) return {} as T;
    try {
        return (await request.json()) as T;
    } catch {
        throw new HttpError(400, 'request body must be valid json');
    }
};

interface Route {
    method: string;
    pattern: URLPattern;
    handler: Handler;
}

export class Router {
    private routes: Route[] = [];

    add(method: string, pathname: string, handler: Handler): this {
        this.routes.push({ method, pattern: new URLPattern({ pathname }), handler });
        return this;
    }

    get = (pathname: string, handler: Handler) => this.add('GET', pathname, handler);
    post = (pathname: string, handler: Handler) => this.add('POST', pathname, handler);
    put = (pathname: string, handler: Handler) => this.add('PUT', pathname, handler);

    /**
     * finds a matching route; returns null when the path is unknown, or a 405 response when only the method is wrong
     */
    match(request: Request): { handler: Handler; params: Params } | Response | null {
        let pathMatched = false;
        for (const route of this.routes) {
            const match = route.pattern.exec(request.url);
            if (!match) continue;
            pathMatched = true;
            if (route.method !== request.method) continue;
            const params: Params = {};
            for (const [key, value] of Object.entries(match.pathname.groups)) params[key] = decodeURIComponent(value ?? '');
            return { handler: route.handler, params };
        }
        return pathMatched ? json({ error: 'method not allowed' }, 405) : null;
    }
}
