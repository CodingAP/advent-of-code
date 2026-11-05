/**
 * frontend/src/state.ts
 *
 * the shared application state and the actions that change it
 */

import { api } from './api.ts';
import { currentAocYear } from './dom.ts';
import { settings } from './settings.ts';
import type { Part, PuzzleDetail, PuzzleRef, RunHandlers, RunOutcome, SubmitOutcome, YearSummary } from './types.ts';

export interface State {
    puzzle: PuzzleRef;
    detail: PuzzleDetail | null;
    detailError: string | null;
    years: YearSummary[];
    dirty: boolean;
    pendingCode: string | null;
    running: boolean;
    lastRun: RunOutcome | null;
    lastSubmit: SubmitOutcome | null;
    lastError: string | null;
}

export type StateKey = keyof State;
type Listener = (state: State, changed: Set<StateKey>) => void;

const listeners = new Set<Listener>();

let state: State = {
    puzzle: settings.get().lastPuzzle ?? { year: currentAocYear(), day: 1 },
    detail: null,
    detailError: null,
    years: [],
    dirty: false,
    pendingCode: null,
    running: false,
    lastRun: null,
    lastSubmit: null,
    lastError: null,
};

export const getState = (): State => state;

export const subscribe = (listener: Listener, keys?: StateKey[]): () => void => {
    const wrapped: Listener = keys ? (next, changed) => keys.some((key) => changed.has(key)) && listener(next, changed) : listener;
    listeners.add(wrapped);
    return () => listeners.delete(wrapped);
};

const update = (patch: Partial<State>) => {
    const changed = new Set<StateKey>();
    for (const key of Object.keys(patch) as StateKey[]) {
        if (patch[key] !== state[key]) changed.add(key);
    }
    if (changed.size === 0) return;
    state = { ...state, ...patch };
    for (const listener of listeners) listener(state, changed);
};

const samePuzzle = (a: PuzzleRef, b: PuzzleRef) => a.year === b.year && a.day === b.day;

const errorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error));

export const actions = {
    async loadYears(): Promise<void> {
        try {
            update({ years: await api.years() });
        } catch (error) {
            update({ lastError: errorMessage(error) });
        }
    },

    /**
     * switches puzzle (asking first when the editor has unsaved changes) and reloads its detail
     */
    async selectPuzzle(puzzle: PuzzleRef, { force = false } = {}): Promise<boolean> {
        if (!force && samePuzzle(puzzle, state.puzzle) && state.detail) return true;
        if (state.dirty && !samePuzzle(puzzle, state.puzzle)) {
            if (!confirm('you have unsaved changes in the editor. discard them?')) return false;
        }

        update({ puzzle, dirty: false, pendingCode: null, detail: null, detailError: null, lastRun: null, lastSubmit: null, lastError: null });
        settings.set({ lastPuzzle: puzzle });
        await this.refreshDetail();
        return true;
    },

    async refreshDetail(): Promise<void> {
        const target = state.puzzle;
        try {
            const detail = await api.detail(target.year, target.day);
            if (samePuzzle(target, state.puzzle)) update({ detail, detailError: null });
        } catch (error) {
            if (samePuzzle(target, state.puzzle)) update({ detailError: errorMessage(error) });
        }
    },

    /** the code panel reports edits here so run/submit can save first */
    setPendingCode(code: string | null): void {
        update({ pendingCode: code, dirty: code !== null });
    },

    async saveSolution(): Promise<void> {
        if (state.pendingCode === null) return;
        const { year, day } = state.puzzle;
        await api.saveSolution(year, day, state.pendingCode);
        update({ pendingCode: null, dirty: false });
    },

    /** scaffolds the puzzle; resolves with the input warning (if any) so panels can show it */
    async fetchPuzzle(inputOnly = false): Promise<string | null> {
        const { year, day } = state.puzzle;
        update({ lastError: null });
        try {
            const result = await api.fetch(year, day, inputOnly);
            if (result.inputError) update({ lastError: result.inputError });
            return result.inputError;
        } catch (error) {
            update({ lastError: errorMessage(error) });
            throw error;
        } finally {
            await this.refreshDetail();
            await this.loadYears();
        }
    },

    async run(
        options: { part: Part; iterations?: number; updateReadme?: boolean; debug?: boolean; commit?: boolean },
        signal?: AbortSignal,
        handlers: RunHandlers = {},
    ): Promise<RunOutcome | null> {
        if (state.running) return null;
        const { year, day } = state.puzzle;
        update({ running: true, lastError: null, lastSubmit: null });
        try {
            await this.saveSolution();
            const outcome = await api.runStream(year, day, { ...options, timeoutMs: settings.get().runTimeoutMs }, handlers, signal);
            update({ lastRun: outcome });
            return outcome;
        } catch (error) {
            if (!(error instanceof DOMException && error.name === 'AbortError')) update({ lastError: errorMessage(error) });
            return null;
        } finally {
            update({ running: false });
            await this.refreshDetail();
        }
    },

    /** runs against an example input; not recorded and does not replace the runner panel's last result */
    async runExample(options: { part: Part; input: string; debug?: boolean }, signal?: AbortSignal, handlers: RunHandlers = {}): Promise<RunOutcome | null> {
        if (state.running) return null;
        const { year, day } = state.puzzle;
        update({ running: true, lastError: null });
        try {
            await this.saveSolution();
            return await api.runStream(
                year,
                day,
                { part: options.part, iterations: 1, input: options.input, debug: options.debug, timeoutMs: settings.get().runTimeoutMs },
                handlers,
                signal,
            );
        } catch (error) {
            if (!(error instanceof DOMException && error.name === 'AbortError')) update({ lastError: errorMessage(error) });
            return null;
        } finally {
            update({ running: false });
        }
    },

    async submit(options: { part: Part; fake: boolean }): Promise<SubmitOutcome | null> {
        if (state.running) return null;
        const { year, day } = state.puzzle;
        update({ running: true, lastError: null, lastSubmit: null });
        try {
            await this.saveSolution();
            const outcome = await api.submit(year, day, options);
            update({ lastSubmit: outcome });
            return outcome;
        } catch (error) {
            update({ lastError: errorMessage(error) });
            return null;
        } finally {
            update({ running: false });
            await this.refreshDetail();
            await this.loadYears();
        }
    },

    clearError(): void {
        update({ lastError: null });
    },
};
