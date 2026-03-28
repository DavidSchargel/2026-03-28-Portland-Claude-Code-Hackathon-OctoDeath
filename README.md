# GitHub Status Lottie App

## Important Note

**GO TO trying-01 BRANCH!**

The app is in the [`octocat-death/`](./octocat-death) directory. See [`octocat-death/README.md`](./octocat-death/README.md) for setup and development instructions.

## Technical Details

Open [`@octocat-death-recap.html`](./octocat-death-recap.html) for technical details

## Running locally

1. Switch to the `trying-01` branch.
2. Run `npm run dev`.

## Live site

Visit https://github-death.inpdx.com

This is running on Cloudflare Workers.

## Overview

A live GitHub status monitor built with TanStack Start. Displays a Lottie animation that reflects whether github.com is currently reachable, updating every 10 seconds.

When GitHub goes down, the "down" animation plays. When it comes back, a "victory" animation plays for 5 seconds before returning to the "up" state. A manual toggle button lets you simulate an outage independently of the real poll.

## Original Plan

See the [original plan](docs/github-status-lottie.md) for the initial instructions given to the AI.
