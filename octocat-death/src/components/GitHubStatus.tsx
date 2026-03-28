import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'

const LottiePlayer = lazy(() =>
  import('lottie-react').then((mod) => ({ default: mod.default })),
)

import animationUp from '../assets/lottie-github-up.json'
import animationDown from '../assets/lottie-github-down.json'
import animationVictory from '../assets/lottie-github-victory.json'

type Status = 'up' | 'down' | 'victory'

async function fetchGitHubStatus() {
  const response = await fetch('/api/status', {
    headers: {
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Status request failed with ${response.status}`)
  }

  return (await response.json()) as { up: boolean }
}

export default function GitHubStatus() {
  const [realStatus, setRealStatus] = useState<'up' | 'down'>('up')
  const [manualOverride, setManualOverride] = useState<Status | null>(null)
  const [buttonLabel, setButtonLabel] = useState('GitHub Down!')
  const [lastCheckedAt, setLastCheckedAt] = useState<string | null>(null)
  const victoryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const manualTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevRealStatus = useRef<'up' | 'down'>('up')

  const poll = useCallback(async () => {
    try {
      const data = await fetchGitHubStatus()
      setRealStatus(data.up ? 'up' : 'down')
      setLastCheckedAt(new Date().toLocaleTimeString())
    } catch {
      setRealStatus('down')
      setLastCheckedAt(new Date().toLocaleTimeString())
    }
  }, [])

  useEffect(() => {
    poll()
    const id = setInterval(poll, 10_000)
    return () => clearInterval(id)
  }, [poll])

  useEffect(() => {
    if (prevRealStatus.current === 'down' && realStatus === 'up' && !manualOverride) {
      if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current)
      setManualOverride('victory')
      victoryTimerRef.current = setTimeout(() => {
        setManualOverride(null)
        victoryTimerRef.current = null
      }, 5000)
    }
    prevRealStatus.current = realStatus
  }, [realStatus, manualOverride])

  useEffect(() => {
    return () => {
      if (victoryTimerRef.current) clearTimeout(victoryTimerRef.current)
      if (manualTimerRef.current) clearTimeout(manualTimerRef.current)
    }
  }, [])

  const handleToggle = () => {
    if (buttonLabel === 'GitHub Down!') {
      if (victoryTimerRef.current) {
        clearTimeout(victoryTimerRef.current)
        victoryTimerRef.current = null
      }
      setManualOverride('down')
      setButtonLabel('GitHub Up!')
    } else {
      setManualOverride('victory')
      if (manualTimerRef.current) clearTimeout(manualTimerRef.current)
      manualTimerRef.current = setTimeout(() => {
        setManualOverride(null)
        setButtonLabel('GitHub Down!')
        manualTimerRef.current = null
      }, 5000)
    }
  }

  const displayStatus: Status =
    manualOverride ?? (realStatus === 'up' ? 'up' : 'down')

  const animationData =
    displayStatus === 'victory'
      ? animationVictory
      : displayStatus === 'down'
        ? animationDown
        : animationUp

  return (
    <div className="github-status">
      <button className="toggle-btn" onClick={handleToggle}>
        {buttonLabel}
      </button>
      <div className="lottie-container">
        <Suspense fallback={<div className="lottie-placeholder" />}>
          <LottiePlayer
            key={displayStatus}
            animationData={animationData}
            loop={true}
            autoplay={true}
          />
        </Suspense>
      </div>
      <p className="status-label">
        {displayStatus === 'victory'
          ? 'GitHub is back!'
          : displayStatus === 'up'
            ? 'GitHub is up'
            : 'GitHub is down'}
      </p>
      <p className="status-meta">
        Live status via Cloudflare Worker{lastCheckedAt ? ` · last checked ${lastCheckedAt}` : ''}
      </p>
    </div>
  )
}
