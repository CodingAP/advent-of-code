/**
 * frontend/src/debugstore.ts
 *
 * breakpoints per puzzle (remembered) and the line the debugger is paused on, shared by the code and debugger panels
 */

import type { Part, PuzzleRef } from './types.ts';

const STORAGE_KEY = 'aoc.breakpoints';

export interface PausedLocation extends PuzzleRef {
    line: number; // 1-based line in solution.ts, or 0 when paused somewhere else
    file: string; // url of the paused script
}

/** what another panel wants debugged: the real input, or an example */
export interface DebugRequest {
    part: Part;
    input?: string;
    label?: string;
}

type Listener = () => void;

const load = (): Record<string, number[]> => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    } catch {
        return {};
    }
};

let breakpoints = load();
let paused: PausedLocation | null = null;
let request: DebugRequest | null = null;
const listeners = new Set<Listener>();

const key = (puzzle: PuzzleRef) => `${puzzle.year}/${puzzle.day}`;
const notify = () => listeners.forEach((listener) => listener());

export const debugStore = {
    onChange(listener: Listener): () => void {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },

    /** sorted 1-based lines with a breakpoint for the puzzle */
    breakpoints(puzzle: PuzzleRef): number[] {
        return [...(breakpoints[key(puzzle)] ?? [])].sort((a, b) => a - b);
    },

    toggleBreakpoint(puzzle: PuzzleRef, line: number): void {
        const current = new Set(breakpoints[key(puzzle)] ?? []);
        current.has(line) ? current.delete(line) : current.add(line);
        if (current.size) breakpoints[key(puzzle)] = [...current];
        else delete breakpoints[key(puzzle)];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(breakpoints));
        notify();
    },

    clearBreakpoints(puzzle: PuzzleRef): void {
        delete breakpoints[key(puzzle)];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(breakpoints));
        notify();
    },

    /** asks the debugger panel to start; the panel picks it up with takeRequest */
    requestSession(next: DebugRequest): void {
        request = next;
        notify();
    },

    takeRequest(): DebugRequest | null {
        const current = request;
        request = null;
        return current;
    },

    get paused(): PausedLocation | null {
        return paused;
    },

    setPaused(location: PausedLocation | null): void {
        paused = location;
        notify();
    },
};
