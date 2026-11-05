# advent of code manager: api server + web frontend
#
#   docker build -t aoc .
#   docker run -p 8000:8000 -e API_TOKEN=... -v $(pwd)/puzzles:/app/puzzles -v $(pwd)/backend/aoc_data.db:/app/backend/aoc_data.db aoc
#
# then set the adventofcode.com session cookie from the settings panel (it is stored in backend/local.json inside the container;
# mount that file too if it should survive rebuilds, or pass -e SESSION=... as a fallback).
#
# on codingap.dev the compose file builds this image and bind-mounts the checkout over /app, so the copy below only
# matters for standalone use.
FROM denoland/deno:2.9.7

# git + ssh so profiling can commit and push the puzzle (see backend/src/git.ts)
USER root
RUN apt-get update \
    && apt-get install -y --no-install-recommends git openssh-client ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

RUN deno task build \
    && deno check backend/cli.ts backend/server.ts backend/runner-child.ts

ENV PORT=8000
EXPOSE 8000

CMD ["deno", "task", "serve"]
