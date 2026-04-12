const routes = {}

export function addRoute(path, handler) {
  routes[path] = handler
}

export function navigate(path) {
  window.location.hash = path
}

export function getParams() {
  const hash = window.location.hash.slice(1) // # 제거
  const parts = hash.split('/')
  return parts
}

function matchRoute(hash) {
  // 정확한 매치 먼저
  if (routes[hash]) {
    return { handler: routes[hash], params: {} }
  }

  // 파라미터 매치 (예: /posts/:id)
  for (const pattern in routes) {
    const patternParts = pattern.split('/')
    const hashParts = hash.split('/')

    if (patternParts.length !== hashParts.length) continue

    const params = {}
    let match = true

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = hashParts[i]
      } else if (patternParts[i] !== hashParts[i]) {
        match = false
        break
      }
    }

    if (match) {
      return { handler: routes[pattern], params }
    }
  }

  return null
}

export function startRouter() {
  function handleRoute() {
    const hash = window.location.hash.slice(1) || '/posts'
    const result = matchRoute(hash)

    if (result) {
      result.handler(result.params)
    } else {
      navigate('/posts')
    }
  }

  window.addEventListener('hashchange', handleRoute)
  handleRoute()
}
