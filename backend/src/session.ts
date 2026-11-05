/**
 * backend/src/session.ts
 *
 * the adventofcode.com session cookie. it expires and gets rotated, so it lives in a gitignored json file
 * that is re-read on every use and can be changed at runtime (cli, api, settings panel).
 * the SESSION environment variable is only a fallback for containers.
 *
 * by alex prosser
 */

import { backendDir } from './config.ts';
import { join, readTextOrNull } from './fs.ts';

export const LOCAL_CONFIG_PATH = join(backendDir, 'local.json');

interface LocalConfig {
    session?: string;
    updated?: string;
}

export interface SessionInfo {
    configured: boolean;
    source: 'file' | 'env' | null;
    preview: string | null; // last few characters, enough to recognise which cookie is active
    updated: string | null;
}

const readLocal = async (): Promise<LocalConfig> => {
    const raw = await readTextOrNull(LOCAL_CONFIG_PATH);
    if (!raw) return {};
    try {
        return JSON.parse(raw) as LocalConfig;
    } catch {
        return {};
    }
};

/** the active session cookie, or '' when none is configured */
export const getSession = async (): Promise<string> => {
    const local = await readLocal();
    return local.session?.trim() || Deno.env.get('SESSION')?.trim() || '';
};

export const getSessionInfo = async (): Promise<SessionInfo> => {
    const local = await readLocal();
    const fromFile = local.session?.trim();
    const fromEnv = Deno.env.get('SESSION')?.trim();
    const active = fromFile || fromEnv || '';
    return {
        configured: active !== '',
        source: fromFile ? 'file' : fromEnv ? 'env' : null,
        preview: active ? `…${active.slice(-6)}` : null,
        updated: fromFile ? (local.updated ?? null) : null,
    };
};

/** stores (or with null, clears) the session cookie */
export const setSession = async (session: string | null): Promise<SessionInfo> => {
    const local = await readLocal();
    const cleaned = session?.trim().replace(/^session=/, '') ?? '';
    if (cleaned) {
        local.session = cleaned;
        local.updated = new Date().toISOString();
    } else {
        delete local.session;
        delete local.updated;
    }
    await Deno.writeTextFile(LOCAL_CONFIG_PATH, JSON.stringify(local, null, 4) + '\n');
    return getSessionInfo();
};
