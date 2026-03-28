# Seed Prompts

Create a Tanstack Start website  that is going to look at github.com and if github.com is running, it's going to play the lottie-github-up.json Lottie animation. If github.com is down, I want to play the lottie-github-down.json Lottie animation. Once github.com comes back online from a point where it was not online, I want to play the lottie-github-victory.json lottie animation. I want to use the fetch API to check if github.com is accessible. I want to check every 10 seconds if github.com is accessible or not. I want to have a button at the top that pretends that GitHub is down and I want it to say "GitHub Down!" and once that button is pressed (this will play the lottie-github-down.json Lottie animation), I want that button then change to the button that says "GitHub Up!" (and this will play the lottie-github-victory.json Lottie animation).

## Questions asked in Interview

A few targeted questions to sharpen the prompt:

  1. Lottie library — Do you have a preferred Lottie renderer package (e.g., lottie-web, @lottiefiles/dotlottie-react, lottie-react)?
   Or should the agent pick one?

  2. Animation files location — Where should the .json animation files live in the project? (e.g., public/, src/assets/) — and do the
   two files you mentioned in the git status (Github Logo Octocat animated.json, Github Logo Octocat animated copy.json) relate to
  this project?

  3. CORS / fetch strategy — Fetching github.com directly from the browser will hit CORS. Should the agent create a small server-side
   route/API endpoint in TanStack Start to proxy the check, or handle it another way?

  4. Victory animation lifecycle — After the victory animation plays (GitHub came back up), what happens next? Does it transition
  back to the "up" animation automatically, and if so — after the victory animation completes once, or after a fixed duration?

  5. Toggle button state machine — To confirm: pressing "GitHub Down!" plays the down animation and flips the button to "GitHub Up!".
   Pressing "GitHub Up!" plays the victory animation. After that, does the button reset to "GitHub Down!" again, and does the real
  polling resume?

  6. Styling — Any CSS framework preference (Tailwind, plain CSS, etc.), or leave it to the agent?

#### Our answers
❯ 1. let the agent pick. 2. They are in src/assets/. 3. create a small server-side  route/API endpoint in TanStack Start to proxy
the check. 4. Keep playing it for 5 seconds, then switch to lottie-github-up.json Lottie animation. 5. the button reset to "GitHub
Down!" again after 1 second. 6. Plain CSS.