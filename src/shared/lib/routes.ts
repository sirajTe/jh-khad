import { findPolicy } from '@/content/policies'
import type { Policy } from '@/types'

export type AppRoute =
  | { name: 'home' }
  | { name: 'policy'; policy: Policy }
  | { name: 'product'; productId: string }

export const routes = {
  home: '/',
  products: '/#products',
  product: (id: string): string => `/product/${encodeURIComponent(id)}`,
} as const

export const productPath = (id: string): string => routes.product(id)

export function productIdFromPath(pathname?: string | null): string | null {
  const path = (pathname || '').replace(/\/+$/, '') || '/'
  const m = path.match(/^\/product\/([^/]+)$/)
  if (!m) return null
  try {
    return decodeURIComponent(m[1])
  } catch {
    return m[1]
  }
}

export function parseRoute(pathname: string): AppRoute {
  const policy = findPolicy(pathname)
  if (policy) return { name: 'policy', policy }
  const productId = productIdFromPath(pathname)
  if (productId) return { name: 'product', productId }
  return { name: 'home' }
}

// Unknown paths (e.g. /app/login) are tidied back to home.
export function isKnownPath(pathname: string): boolean {
  const home = import.meta.env.BASE_URL
  return pathname === home || pathname === `${home}index.html` || parseRoute(pathname).name !== 'home'
}
