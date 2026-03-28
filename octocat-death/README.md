# Octocat Death

A live GitHub status monitor that plays Lottie animations based on whether github.com is reachable.

## What it does

Polls `github.com` every 10 seconds via a server-side proxy (to avoid CORS) and displays one of three animations:

| Animation | Trigger |
|-----------|---------|
| `lottie-github-up.json` | GitHub is reachable |
| `lottie-github-down.json` | GitHub is not reachable |
| `lottie-github-victory.json` | GitHub comes back online — plays for 5 seconds, then returns to "up" |

A toggle button at the top lets you simulate an outage independently of the real poll. Pressing **GitHub Down!** immediately plays the down animation; pressing **GitHub Up!** plays victory for 1 second and then resets.

## Stack

- [TanStack Start](https://tanstack.com/start) — React SSR framework
- [TanStack Router](https://tanstack.com/router) — file-based routing
- [lottie-react](https://github.com/LottieFiles/lottie-react) — animation playback
- Plain CSS + Tailwind CSS

## Development

The project lives in the `octocat-death/` subdirectory — `cd` into it before running any commands.


```bash
cd octocat-death
npm install
npm run dev      # http://localhost:3000
npm run build
npm run test
```
