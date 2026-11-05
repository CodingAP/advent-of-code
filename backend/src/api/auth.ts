/**
 * backend/src/api/auth.ts
 *
 * bearer token protection for the api; disabled when API_TOKEN is not set (local use)
 *
 * by alex prosser
 */

import { env } from '../config.ts';

const timingSafeEqual = (a: string, b: string): boolean => {
    const encoder = new TextEncoder();
    const left = encoder.encode(a);
    const right = encoder.encode(b);
    if (left.length !== right.length) return false;
    let diff = 0;
    for (let i = 0; i < left.length; i++) diff |= left[i] ^ right[i];
    return diff === 0;
};

export const authEnabled = (): boolean => env.apiToken() !== undefined;

/**
 * true when the request may use the api
 */
export const isAuthorized = (request: Request): boolean => {
    const token = env.apiToken();
    if (!token) return true;

    const header = request.headers.get('authorization') ?? '';
    const [scheme, value] = header.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !value) return false;
    return timingSafeEqual(value, token);
};
