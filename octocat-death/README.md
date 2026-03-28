# Octocat Death

A live GitHub status monitor that plays Lottie animations based on whether github.com is reachable.

## What it does

Polls `github.com` every 10 seconds through a Cloudflare Worker endpoint and displays one of three animations:

| Animation | Trigger |
|-----------|---------|
| `lottie-github-up.json` | GitHub is reachable |
| `lottie-github-down.json` | GitHub is not reachable |
| `lottie-github-victory.json` | GitHub comes back online — plays for 5 seconds, then returns to "up" |

A toggle button at the top lets you simulate an outage independently of the real poll. Pressing **GitHub Down!** immediately plays the down animation; pressing **GitHub Up!** plays victory for 5 seconds and then resets.

## Stack

- React + Vite
- Cloudflare Workers static assets + API route
- `lottie-react`
- Plain CSS + Tailwind CSS

## Development

The project lives in the `octocat-death/` subdirectory — `cd` into it before running any commands.

```bash
cd octocat-death
npm install
npm run dev
npm run build
npm run preview
```

## Deploy to Cloudflare Workers

1. Authenticate Wrangler:
   ```bash
   npx wrangler login
   ```
2. Build and deploy:
   ```bash
   npm run build
   npx wrangler deploy
   ```
3. In Cloudflare DNS, ensure `github-death.inpdx.com` is proxied and attached to this Worker route.

The Worker config lives in `wrangler.jsonc` and serves:
- `/api/status` → live GitHub probe
- `/*` → static frontend from `dist/`
