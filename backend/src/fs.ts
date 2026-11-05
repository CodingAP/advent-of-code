/**
 * backend/src/fs.ts
 *
 * the handful of path and file helpers we need, on top of the built in deno apis
 *
 * by alex prosser
 */

/** joins path segments with '/' and collapses duplicate separators */
export const join = (...parts: string[]): string => parts.join('/').replace(/\/{2,}/g, '/');

/** absolute path of a location relative to a module url (e.g. fromModule(import.meta.url, '../..')) */
export const fromModule = (moduleUrl: string, relative: string): string => {
    const url = new URL(relative.endsWith('/') ? relative : `${relative}/`, moduleUrl);
    return decodeURIComponent(url.pathname).replace(/\/$/, '');
};

export const toFileUrl = (path: string): URL => {
    const url = new URL('file:///');
    url.pathname = path;
    return url;
};

export const ensureDir = async (path: string): Promise<void> => {
    await Deno.mkdir(path, { recursive: true });
};

export const exists = async (path: string): Promise<boolean> => {
    try {
        await Deno.stat(path);
        return true;
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) return false;
        throw error;
    }
};

export const readTextOrNull = async (path: string): Promise<string | null> => {
    try {
        return await Deno.readTextFile(path);
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) return null;
        throw error;
    }
};
