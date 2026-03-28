# GitHub Status Lottie App

## Overview

A TanStack Start website that displays a Lottie animation reflecting the live status of github.com.

## Architecture

- **Framework:** TanStack Start
- **Styling:** Plain CSS (no frameworks)
- **Polling:** Client polls a server-side proxy endpoint every 10 seconds

## API Route

A server-side API route within TanStack Start proxies a fetch to `github.com` to avoid CORS issues on the client.

## Animations

Lottie animation files are located in `src/assets/`:

| File | Trigger |
|------|---------|
| `lottie-github-up.json` | GitHub is reachable |
| `lottie-github-down.json` | GitHub is not reachable |
| `lottie-github-victory.json` | GitHub comes back online after being down |

The victory animation plays for **5 seconds**, then automatically transitions back to `lottie-github-up.json`.

## Manual Toggle Button

From a blank homepage...At the top of the page, a toggle button simulates a GitHub outage independently of the real poll.

| Button State | Action |
|---|---|
| **"GitHub Down!"** (initial) | Immediately plays `lottie-github-down.json`; button changes to "GitHub Up!" |
| **"GitHub Up!"** | Immediately plays `lottie-github-victory.json`; after 1 second button resets to "GitHub Down!" |

## State Coexistence

- When the manual toggle is **not active**, the UI reflects the live polling result.
- The toggle **temporarily overrides** the display, then yields back to the real status once the button has fully cycled back to "GitHub Down!".
