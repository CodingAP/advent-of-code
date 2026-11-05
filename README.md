# Advent of Code

These are all my solutions for the years of [Advent of Code](https://adventofcode.com), plus the tooling I use to fetch, run, profile, and submit them: a Deno backend (CLI + JSON API) and a browser frontend with dockable panels (puzzle page, Monaco editor, runner, history, writeups). The same backend runs on my machine or on a cloud box, so I can work on puzzles from anywhere.

```
puzzles/<year>/dayNN/   solution.ts, README.md (results table + writeup after %%%), examples.json (example inputs + expected answers), input.txt + puzzle.md (never committed)
backend/                deno backend: cli.ts, server.ts, src/ (sqlite, runner, aoc client, api)
frontend/               vanilla typescript frontend bundled with `deno bundle`
```

### Setup

You need [Deno](https://deno.com) 2.9+. Inputs and submissions need your adventofcode.com session cookie; it expires every so often, so it is not kept in `.env` but in a gitignored `backend/local.json` that can be changed at runtime:

```bash
deno task cli session --token=<value of the session cookie from adventofcode.com>
```

The Settings panel in the web ui does the same thing (`PUT /api/session`). Optional environment variables (a `.env` in the repository root is loaded automatically): `API_TOKEN` protects the api when it is reachable from elsewhere, `PORT` (8000), `RUN_TIMEOUT_MS` (120000), `RUN_MAX_MEMORY_MB` (2048, v8 heap cap for solution runs), and `SESSION` as a fallback cookie for containers that cannot keep a local file.

Inputs and puzzle text are not stored in git. Download them all with `deno task cli update` (or the download button on the dashboard), or one puzzle at a time with `fetch`.

### CLI

```bash
deno task cli                              # list commands and arguments
deno task cli fetch --year=2024 --day=1    # create solution.ts (if missing), download input.txt and puzzle.md
deno task cli run --year=2024 --day=1      # run both parts with timing (--part=1|2|both; --input=file.txt runs an example instead)
deno task cli profile --year=2024 --day=1 --iterations=10   # average timing, writes the readme results table, commits + pushes the puzzle (--push=false to skip)
deno task cli submit --year=2024 --day=1 --part=1           # submit (--fake=true records without contacting the site)
deno task cli update                       # download missing inputs + puzzle text (--missing=false re-downloads everything)
deno task cli session --token=...          # store / show the adventofcode.com session cookie
deno task cli serve --port=8000            # api server + web ui
```

Solutions run in a sandboxed subprocess with a timeout (`RUN_TIMEOUT_MS`, default 120000) and a heap cap (`RUN_MAX_MEMORY_MB`), console output is printed as it happens, and every run is recorded in SQLite. `run --debug=true` pauses the solution under Deno's inspector so Chrome DevTools (`chrome://inspect`) can attach.

### Web UI

```bash
deno task build   # bundle the frontend once
deno task serve   # http://localhost:8000
deno task dev     # server with reload + frontend rebuild on change
```

The dashboard is the year/day grid with star totals and a button that downloads every missing input and puzzle text. The editor view has panels (AoC, Puzzles, Input, Code, Runner, Tests, Runs, Submissions, README, Settings) that can be opened from the `Panels` menu, dragged into tabs or splits, and the layout is remembered. Presets live under `Layout`. The API token and runner defaults are set in Settings; the UI can also point at a remote backend via the api base url.

The puzzle text is scraped from adventofcode.com into `puzzle.md` next to the solution (gitignored, since the puzzle text should not be redistributed). The AoC panel shows it (with a [website] toggle for the live page); refresh it there after solving part one to pull in part two.

Themes live in Settings → appearance: advent of code (dark), light, hacker, frutiger aero, dracula, nord, and synthwave. A theme is a block of CSS variables in `frontend/static/styles.css` plus matching editor colours in `frontend/src/themes.ts`, so adding one is a copy-and-tweak job.

The Runner streams the solution's console output live (the server keeps only the last 2000 lines), Cancel really kills the process, and **🐞 debug** starts the run paused under the inspector: paste the shown `devtools://…` URL into a Chromium address bar, set breakpoints in `solution.ts` (or use `debugger;`), press resume. The inspector websocket is proxied through the API with a one-time token, so it works over HTTPS on the server too. One debug session at a time.

Profiling also publishes the puzzle: the puzzle directory (solution, README, examples; never inputs or puzzle text) is committed as `<year> day <day>: <title>` and pushed from the machine running the api. Turn it off in Settings ("commit and push the puzzle after profiling") or with `--push=false`. On the server this needs git in the container and a deploy key with write access (see the deployment section).

The Tests panel runs the solution against example inputs: the code blocks from the puzzle text are offered automatically, and examples you save (with expected answers) go to `examples.json` next to the solution so they travel with the repo. Example runs are not recorded in the run history.

### API

All routes are under `/api` and return JSON. When `API_TOKEN` is set every route except `/api/health` requires `Authorization: Bearer <token>`.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/health` | version and whether auth is on |
| GET/PUT | `/api/session` | whether a session cookie is configured / store a new one (`{ session }`) |
| GET | `/api/years` | stars per year |
| GET | `/api/puzzles/:year` | titles, stars, and file status for all 25 days |
| GET | `/api/puzzles/:year/:day` | detail: readme, submissions, runs |
| POST | `/api/puzzles/:year/:day/fetch` | scaffold solution + download input (`{ inputOnly }`) |
| GET/PUT | `/api/puzzles/:year/:day/solution` | read / write `solution.ts` (`{ code }`) |
| GET | `/api/puzzles/:year/:day/input` | raw input |
| GET/PUT | `/api/puzzles/:year/:day/readme` | read / write `README.md` (`{ content }`) |
| GET/POST | `/api/puzzles/:year/:day/description` | stored puzzle text as markdown / re-scrape it |
| GET/POST | `/api/bulk` | status of / start the background download of all inputs and puzzle text (`{ onlyMissing, inputs, descriptions }`) |
| POST | `/api/puzzles/:year/:day/run` | `{ part, iterations, updateReadme, timeoutMs, input, debug, stream, commit }` (`input` runs that text instead of input.txt, unrecorded; `stream: true` answers with server-sent events `start`, `log`, `inspector`, `result`; `debug` starts under the inspector) |
| GET | `/api/debug` | whether a debug session is active |
| GET | `/api/debug/ws/:token` | websocket proxy to the inspector of the current debug run (token from the `inspector` event; no bearer header needed) |
| GET/PUT | `/api/puzzles/:year/:day/examples` | saved example inputs with expected answers (`{ examples }`) |
| POST | `/api/puzzles/:year/:day/submit` | `{ part, fake }` |

Dependencies are kept to a minimum: the backend uses only Deno built-ins (`node:sqlite`, `Deno.serve`, `Deno.Command`); the frontend is bundled by `deno bundle` and loads Monaco and dockview from a CDN. `@std/crypto` stays only because a few 2016 solutions import it.

### Cloud

`Dockerfile` builds an image that serves the API and UI on port 8000. Mount `puzzles/` and `backend/aoc_data.db` so edits made through the UI land in a real checkout you can commit from, and either mount `backend/local.json` or set the session from the Settings panel after starting.

### codingap.dev deployment

The live instance at https://aoc.codingap.dev runs on the home server from `~/docker` (the shared compose file, Caddy on `docker_caddy_net`):

- `~/docker/aoc` is a checkout of this repository, bind-mounted into the `aoc` service (`denoland/deno`, running as `serverap`), which runs `deno task build && deno task serve`. Solutions, inputs, puzzle text, examples and the database all live in that checkout, so you can `git pull` / commit there.
- `~/docker/configs/aoc/.env` holds `API_TOKEN` (paste it into Settings → api token in the browser); `~/docker/configs/aoc/deno-dir` caches dependencies.
- Caddy terminates TLS (`aoc.codingap.dev { reverse_proxy aoc:8000 }` in `configs/caddy/Caddyfile`). Caddy bind-mounts that single file, so after editing it recreate the container (`docker compose up -d --force-recreate caddy`) rather than only reloading, or the container keeps the old inode.
- The image is built from the repo `Dockerfile` (deno + git + ssh). Pushes use the deploy key in `~/docker/configs/aoc/ssh/aoc_deploy` through the `github-aoc` ssh alias (origin is `git@github-aoc:CodingAP/advent-of-code.git`); the author identity comes from `GIT_AUTHOR_*` in `configs/aoc/.env`.
- The service has hard limits (`mem_limit: 4g`, `cpus: 2`, `pids_limit: 256`) and solution runs are capped by `RUN_MAX_MEMORY_MB`, so a runaway solution fails with an out-of-memory error instead of freezing the host.
- Update: `cd ~/docker/aoc && git pull && cd ~/docker && docker compose restart aoc`. Logs: `docker logs -f aoc`.

### Note for AOC moderators

Requests to adventofcode.com are made only from `backend/src/aoc-client.ts` with a User-Agent that points to this repository, and only when a command or API call explicitly asks for them. Inputs are never committed.
