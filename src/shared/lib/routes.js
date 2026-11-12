import { findPolicy } from '@/content/policies'

export const routes = {
  home: '/',
  products: '/#products',
  product: (id) => `/product/${encodeURIComponent(id)}`,
}

export const productPath = (id) => routes.product(id)

export function productIdFromPath(pathname) {
  const path = (pathname || '').replace(/\/+$/, '') || '/'
  const m = path.match(/^\/product\/([^/]+)$/)
  if (!m) return null
  try {
    return decodeURIComponent(m[1])
  } catch {
    return m[1]
  }
}

export function parseRoute(pathname) {
  const policy = findPolicy(pathname)
  if (policy) return { name: 'policy', policy }
  const productId = productIdFromPath(pathname)
  if (productId) return { name: 'product', productId }
  return { name: 'home' }
}

// Unknown paths (e.g. /app/login) are tidied back to home.
export function isKnownPath(pathname) {
  const home = import.meta.env.BASE_URL
  return pathname === home || pathname === `${home}index.html` || parseRoute(pathname).name !== 'home'
}
