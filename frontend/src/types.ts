/**
 * frontend/src/types.ts
 *
 * shapes returned by the backend api (mirrors backend/src)
 */

export type Part = '1' | '2' | 'both';

export interface PuzzleRef {
    year: number;
    day: number;
}

export interface YearSummary {
    year: number;
    days: number;
    stars: number;
}

export interface DaySummary {
    day: number;
    title: string | null;
    stars: number;
    hasSolution: boolean;
    hasInput: boolean;
    hasReadme: boolean;
    hasDescription: boolean;
}

export interface AnswerRow {
    answer_id: number;
    day: string;
    year: string;
    part: string;
    answer: string;
    result: number;
    created: string;
}

export interface RunRow {
    run_id: number;
    day: string;
    year: string;
    part: string;
    answer: string | null;
    time_ms: number | null;
    iterations: number;
    success: number;
    error: string | null;
    created: string;
}

export interface PuzzleDetail extends PuzzleRef {
    title: string | null;
    stars: number;
    hasSolution: boolean;
    hasInput: boolean;
    hasReadme: boolean;
    hasDescription: boolean;
    readme: string | null;
    answers: AnswerRow[];
    runs: RunRow[];
}

export interface PartResult {
    answer: string;
    timeMs: number;
}

export interface RunOutcome {
    success: boolean;
    error?: string;
    results: { part1?: PartResult; part2?: PartResult };
    logs: string;
    logLines: number;
    durationMs: number;
    iterations: number;
    readmeUpdated: boolean;
    cancelled: boolean;
    git?: { committed: boolean; pushed: boolean; commit?: string; message: string };
}

export interface RunRequest {
    part: Part;
    iterations?: number;
    updateReadme?: boolean;
    timeoutMs?: number;
    input?: string;
    debug?: boolean;
    commit?: boolean;
}

export interface RunHandlers {
    onLog?: (line: string) => void;
    onInspector?: (info: { token: string }) => void;
    onStart?: () => void;
}

export interface SubmitPartOutcome {
    answer: string;
    message: string;
    correct: boolean | null;
}

export interface SubmitOutcome {
    part1?: SubmitPartOutcome;
    part2?: SubmitPartOutcome;
}

export interface Example {
    name: string;
    input: string;
    expected?: { part1?: string; part2?: string };
}

export interface Description {
    markdown: string;
    parts: number;
    fetchedAt: string | null;
}

export interface BulkOptions {
    onlyMissing: boolean;
    inputs: boolean;
    descriptions: boolean;
}

export interface BulkStatus {
    running: boolean;
    total: number;
    done: number;
    downloaded: number;
    skipped: number;
    current: string | null;
    errors: string[];
    startedAt: string | null;
    finishedAt: string | null;
    options: BulkOptions | null;
}

export interface SessionInfo {
    configured: boolean;
    source: 'file' | 'env' | null;
    preview: string | null;
    updated: string | null;
}

export interface Health {
    ok: boolean;
    version: string;
    auth: boolean;
}
