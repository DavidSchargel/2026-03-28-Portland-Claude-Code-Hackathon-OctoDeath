export interface Env {
  ASSETS: {
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
  }
}

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...(init?.headers ?? {}),
    },
  })
}

async function fetchGitHubStatus() {
  try {
    const response = await fetch('https://github.com', {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
      headers: {
        'user-agent': 'github-death-worker',
      },
    })

    return {
      up: response.ok,
      checkedAt: new Date().toISOString(),
    }
  } catch {
    return {
      up: false,
      checkedAt: new Date().toISOString(),
    }
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/status') {
      return json(await fetchGitHubStatus())
    }

    const assetResponse = await env.ASSETS.fetch(request)
    if (assetResponse.status !== 404) {
      return assetResponse
    }

    const isRouteRequest = request.method === 'GET' && !url.pathname.includes('.')
    if (isRouteRequest) {
      const indexRequest = new Request(new URL('/index.html', url.origin), request)
      return env.ASSETS.fetch(indexRequest)
    }

    return assetResponse
  },
}
