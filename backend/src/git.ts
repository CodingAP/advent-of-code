/**
 * backend/src/git.ts
 *
 * commits a puzzle's files and pushes them, so profiling a solution also publishes it
 *
 * by alex prosser
 */

import { repoRoot } from './config.ts';
import { getPuzzlePaths } from './puzzles.ts';

export interface GitOutcome {
    committed: boolean;
    pushed: boolean;
    commit?: string; // short hash when something was committed
    message: string; // human readable summary (also carries the error when something failed)
}

const git = async (...args: string[]): Promise<{ ok: boolean; out: string }> => {
    const result = await new Deno.Command('git', { args, cwd: repoRoot, stdin: 'null', stdout: 'piped', stderr: 'piped' }).output();
    const out = (new TextDecoder().decode(result.stdout) + new TextDecoder().decode(result.stderr)).trim();
    return { ok: result.success, out };
};

/**
 * stages the puzzle directory (inputs and puzzle text stay ignored), commits only those paths, and pushes.
 * nothing to commit is not an error; a rejected push is retried once after a rebase on the remote branch.
 */
export const publishPuzzle = async (year: number, day: number, title: string | null): Promise<GitOutcome> => {
    const relative = getPuzzlePaths(year, day).directory.slice(repoRoot.length + 1);

    const inside = await git('rev-parse', '--is-inside-work-tree');
    if (!inside.ok) return { committed: false, pushed: false, message: `not a git checkout: ${inside.out}` };

    const add = await git('add', '--', relative);
    if (!add.ok) return { committed: false, pushed: false, message: `git add failed: ${add.out}` };

    const staged = await git('diff', '--cached', '--quiet', '--', relative);
    if (staged.ok) return { committed: false, pushed: false, message: 'nothing new to commit' };

    const subject = `${year} day ${day}${title ? `: ${title}` : ''}`;
    const commit = await git('commit', '-q', '-m', subject, '--', relative);
    if (!commit.ok) return { committed: false, pushed: false, message: `git commit failed: ${commit.out}` };
    const hash = (await git('rev-parse', '--short', 'HEAD')).out;

    let push = await git('push', '--quiet');
    if (!push.ok && /rejected|fetch first|non-fast-forward/i.test(push.out)) {
        const rebase = await git('pull', '--rebase', '--autostash', '--quiet');
        if (!rebase.ok) {
            await git('rebase', '--abort');
            return {
                committed: true,
                pushed: false,
                commit: hash,
                message: `committed ${hash}, but the remote has new commits and rebasing failed: ${rebase.out}`,
            };
        }
        push = await git('push', '--quiet');
    }
    if (!push.ok) return { committed: true, pushed: false, commit: hash, message: `committed ${hash}, but push failed: ${push.out}` };

    return { committed: true, pushed: true, commit: hash, message: `committed ${hash} and pushed` };
};
