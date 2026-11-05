/**
 * backend/server.ts
 *
 * http server: json api under /api plus the built frontend for everything else
 *
 * by alex prosser
 */

import { join } from './src/fs.ts';
import { isAuthorized } from './src/api/auth.ts';
import { createApiRouter, errorResponse } from './src/api/routes.ts';
import { json } from './src/api/router.ts';
import { env, frontendDir } from './src/config.ts';

const CORS_HEADERS = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, OPTIONS',
    'access-control-allow-headers': 'authorization, content-type',
    'access-control-max-age': '86400',
};

const withCors = (response: Response): Response => {
    for (const [key, value] of Object.entries(CORS_HEADERS)) response.headers.set(key, value);
    return response;
};

const CONTENT_TYPES: Record<string, string> = {
    js: 'text/javascript; charset=utf-8',
    map: 'application/json',
    css: 'text/css; charset=utf-8',
    html: 'text/html; charset=utf-8',
    png: 'image/png',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
    webmanifest: 'application/manifest+json',
    xml: 'application/xml',
    json: 'application/json',
    txt: 'text/plain; charset=utf-8',
};

/**
 * serves a file from the frontend directory; paths are normalised so nothing outside it can be reached
 */
const serveStatic = async (pathname: string): Promise<Response> => {
    const segments = decodeURIComponent(pathname).split('/').filter((segment) => segment && segment !== '.');
    if (segments.some((segment) => segment === '..')) return new Response('not found', { status: 404 });

    try {
        const file = await Deno.open(join(frontendDir, ...segments), { read: true });
        const stat = await file.stat();
        if (!stat.isFile) {
            file.close();
            return new Response('not found', { status: 404 });
        }
        const extension = segments.at(-1)?.split('.').pop()?.toLowerCase() ?? '';
        return new Response(file.readable, {
            headers: {
                'content-type': CONTENT_TYPES[extension] ?? 'application/octet-stream',
                'content-length': String(stat.size),
                // the bundle and styles change on every build, so make browsers revalidate them
                'cache-control': 'no-cache',
            },
        });
    } catch {
        return new Response('not found', { status: 404 });
    }
};

export const createHandler = (): Deno.ServeHandler => {
    const api = createApiRouter();

    return async (request) => {
        const url = new URL(request.url);

        if (url.pathname.startsWith('/api')) {
            if (request.method === 'OPTIONS') return withCors(new Response(null, { status: 204 }));
            const tokenInPath = url.pathname.startsWith('/api/debug/ws/');
            if (url.pathname !== '/api/health' && !tokenInPath && !isAuthorized(request)) {
                return withCors(json({ error: 'unauthorized' }, 401, { 'www-authenticate': 'Bearer' }));
            }

            const matched = api.match(request);
            if (matched === null) return withCors(json({ error: 'not found' }, 404));
            if (matched instanceof Response) return withCors(matched);

            try {
                return withCors(await matched.handler(request, matched.params));
            } catch (error) {
                return withCors(errorResponse(error));
            }
        }

        // frontend: only the built bundle, static assets, and the entry page are exposed
        if (url.pathname.startsWith('/dist/') || url.pathname.startsWith('/static/')) {
            return serveStatic(url.pathname);
        }

        if (url.pathname === '/' || url.pathname === '/index.html') {
            try {
                const html = await Deno.readTextFile(join(frontendDir, 'index.html'));
                return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' } });
            } catch {
                return new Response('frontend not built yet: run `deno task build`', { status: 503 });
            }
        }

        return new Response('not found', { status: 404 });
    };
};

export const startServer = (port = env.port()): Deno.HttpServer => {
    return Deno.serve({
        port,
        onListen: ({ hostname, port }) => {
            const address = hostname === '0.0.0.0' ? 'localhost' : hostname;
            console.log(`advent of code manager listening on http://${address}:${port} (auth ${env.apiToken() ? 'enabled' : 'disabled'})`);
        },
    }, createHandler());
};

if (import.meta.main) {
    startServer();
}
