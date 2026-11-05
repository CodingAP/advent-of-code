/**
 * frontend/src/api.ts
 *
 * thin fetch wrapper for the backend json api
 */

import { settings } from './settings.ts';
import type {
    BulkOptions,
    BulkStatus,
    DaySummary,
    Description,
    Example,
    Health,
    Part,
    PuzzleDetail,
    RunHandlers,
    RunOutcome,
    RunRequest,
    SessionInfo,
    SubmitOutcome,
    YearSummary,
} from './types.ts';

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

type UnauthorizedListener = () => void;
const unauthorizedListeners = new Set<UnauthorizedListener>();

/** called whenever the api rejects the current token */
export const onUnauthorized = (listener: UnauthorizedListener) => {
    unauthorizedListeners.add(listener);
    return () => unauthorizedListeners.delete(listener);
};

const request = async (path: string, init: RequestInit = {}): Promise<Response> => {
    const { apiBase, token } = settings.get();
    const headers = new Headers(init.headers);
    if (token) headers.set('authorization', `Bearer ${token}`);
    if (init.body) headers.set('content-type', 'application/json');

    const response = await fetch(`${apiBase.replace(/\/$/, '')}${path}`, { ...init, headers });

    if (response.status === 401) {
        for (const listener of unauthorizedListeners) listener();
        throw new ApiError(401, 'unauthorized: set your api token in settings');
    }

    if (!response.ok) {
        let message = `${response.status} ${response.statusText}`;
        try {
            const body = await response.json();
            if (body?.error) message = body.error;
        } catch {
            // not json, keep the status text
        }
        throw new ApiError(response.status, message);
    }

    return response;
};

const getJson = async <T>(path: string): Promise<T> => (await request(path)).json();
const getText = async (path: string): Promise<string> => (await request(path)).text();
const send = async <T>(method: string, path: string, body?: unknown, signal?: AbortSignal): Promise<T> =>
    (await request(path, { method, body: body === undefined ? undefined : JSON.stringify(body), signal })).json();

const puzzle = (year: number, day: number) => `/api/puzzles/${year}/${day}`;

export const api = {
    health: () => getJson<Health>('/api/health'),
    session: () => getJson<SessionInfo>('/api/session'),
    setSession: (session: string) => send<SessionInfo>('PUT', '/api/session', { session }),
    years: () => getJson<YearSummary[]>('/api/years'),
    year: (year: number) => getJson<DaySummary[]>(`/api/puzzles/${year}`),
    detail: (year: number, day: number) => getJson<PuzzleDetail>(puzzle(year, day)),
    solution: async (year: number, day: number): Promise<string | null> => {
        try {
            return (await getJson<{ code: string }>(`${puzzle(year, day)}/solution`)).code;
        } catch (error) {
            if (error instanceof ApiError && error.status === 404) return null;
            throw error;
        }
    },
    saveSolution: (year: number, day: number, code: string) => send<{ ok: true }>('PUT', `${puzzle(year, day)}/solution`, { code }),
    input: async (year: number, day: number): Promise<string | null> => {
        try {
            return await getText(`${puzzle(year, day)}/input`);
        } catch (error) {
            if (error instanceof ApiError && error.status === 404) return null;
            throw error;
        }
    },
    description: async (year: number, day: number): Promise<Description | null> => {
        try {
            return await getJson<Description>(`${puzzle(year, day)}/description`);
        } catch (error) {
            if (error instanceof ApiError && error.status === 404) return null;
            throw error;
        }
    },
    refreshDescription: (year: number, day: number) => send<Description>('POST', `${puzzle(year, day)}/description`),
    bulkStatus: () => getJson<BulkStatus>('/api/bulk'),
    bulkStart: (options: Partial<BulkOptions>) => send<BulkStatus>('POST', '/api/bulk', options),
    saveReadme: (year: number, day: number, content: string) => send<{ ok: true }>('PUT', `${puzzle(year, day)}/readme`, { content }),
    fetch: (year: number, day: number, inputOnly = false) =>
        send<{ ok: true; createdSolution: boolean; inputError: string | null }>('POST', `${puzzle(year, day)}/fetch`, { inputOnly }),
    examples: (year: number, day: number) => getJson<Example[]>(`${puzzle(year, day)}/examples`),
    saveExamples: (year: number, day: number, examples: Example[]) => send<Example[]>('PUT', `${puzzle(year, day)}/examples`, { examples }),
    run: (year: number, day: number, options: RunRequest, signal?: AbortSignal) => send<RunOutcome>('POST', `${puzzle(year, day)}/run`, options, signal),
    /** streaming run: console lines arrive through handlers as they happen; resolves with the final outcome */
    runStream: async (year: number, day: number, options: RunRequest, handlers: RunHandlers, signal?: AbortSignal): Promise<RunOutcome> => {
        const response = await request(`${puzzle(year, day)}/run`, { method: 'POST', body: JSON.stringify({ ...options, stream: true }), signal });
        if (!response.body) throw new ApiError(500, 'no response body');
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let outcome: RunOutcome | null = null;
        let failure: string | null = null;

        const handle = (event: string, data: string) => {
            const payload = data ? JSON.parse(data) : {};
            if (event === 'log') handlers.onLog?.(payload.line);
            else if (event === 'inspector') handlers.onInspector?.(payload);
            else if (event === 'start') handlers.onStart?.();
            else if (event === 'result') outcome = payload;
            else if (event === 'error') failure = payload.message;
        };

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            let index: number;
            while ((index = buffer.indexOf('\n\n')) !== -1) {
                const chunk = buffer.slice(0, index);
                buffer = buffer.slice(index + 2);
                let event = 'message';
                const data: string[] = [];
                for (const line of chunk.split('\n')) {
                    if (line.startsWith('event:')) event = line.slice(6).trim();
                    else if (line.startsWith('data:')) data.push(line.slice(5).trimStart());
                }
                handle(event, data.join('\n'));
            }
        }
        if (failure) throw new ApiError(500, failure);
        if (!outcome) throw new ApiError(500, 'the run ended without a result');
        return outcome;
    },
    submit: (year: number, day: number, options: { part: Part; fake: boolean }) => send<SubmitOutcome>('POST', `${puzzle(year, day)}/submit`, options),
};
