import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import GitHubStatus from './components/GitHubStatus'
import Header from './components/Header'

function HomePage() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">GitHub Status Monitor</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          Is GitHub alive?
        </h1>
        <p className="m-0 max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
          This site polls GitHub through a Cloudflare Worker endpoint and swaps between up,
          down, and victory Lottie animations every 10 seconds.
        </p>
        <GitHubStatus />
      </section>
    </main>
  )
}

function AboutPage() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">About</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Published on Cloudflare Workers.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          The frontend is a Vite React app. The Worker exposes <code>/api/status</code>,
          performs a 5-second HEAD request to <code>https://github.com</code>, and serves
          the built site from the same deployment.
        </p>
      </section>
    </main>
  )
}

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return (
    <>
      <Header pathname={pathname} />
      {pathname === '/about' ? <AboutPage /> : <HomePage />}
      <Footer />
    </>
  )
}
