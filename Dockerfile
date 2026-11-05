# advent of code manager: api server + web frontend
#
#   docker build -t aoc .
#   docker run -p 8000:8000 -e API_TOKEN=... -v $(pwd)/puzzles:/app/puzzles -v $(pwd)/backend/aoc_data.db:/app/backend/aoc_data.db aoc
#
# then set the adventofcode.com session cookie from the settings panel (it is stored in backend/local.json inside the container;
# mount that file too if it should survive rebuilds, or pass -e SESSION=... as a fallback).
#
# mount puzzles/ and the database so edits made through the web ui land in your checkout.
FROM denoland/deno:2.9.7

WORKDIR /app
COPY . .

RUN deno task build \
    && deno check backend/cli.ts backend/server.ts backend/runner-child.ts

ENV PORT=8000
EXPOSE 8000

CMD ["deno", "task", "serve"]
