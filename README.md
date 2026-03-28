# GitHub Status Lottie App

**GO TO trying-01 BRANCH!!!**

---

## 📊 PROJECT RECAP

> **A full visual project recap is available at [`octocat-death-recap.html`](./octocat-death-recap.html)**
>
> Open it in your browser for:
> - Architecture diagram of the full system
> - Recent activity timeline (4 commits, confetti animation in-progress)
> - Decision log — *why* things were built the way they were
> - State of things dashboard (working / in-progress / degraded)
> - Mental model essentials (7 things to hold in your head)
> - Cognitive debt hotspots with actionable fixes
> - Next steps
>
> ```bash
> open octocat-death-recap.html
> ```

---

A live GitHub status monitor built with TanStack Start. Displays a Lottie animation that reflects whether github.com is currently reachable, updating every 10 seconds.

When GitHub goes down, the down animation plays. When it comes back, a victory animation plays for 5 seconds before returning to the up state. A manual toggle button lets you simulate an outage independently of the real poll.

## Project

The app is in the [`octocat-death/`](./octocat-death) directory. See [`octocat-death/README.md`](./octocat-death/README.md) for setup and development instructions.
