import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App'
import { isKnownPath } from '@/shared/lib/routes'
import '@/styles/index.css'

// Unknown paths (e.g. /app/login) are tidied back to home. Policy pages and
// product details keep their address so they can be opened and shared.
const home = import.meta.env.BASE_URL
const path = window.location.pathname
if (!isKnownPath(path)) {
  window.history.replaceState(null, '', home + window.location.search + window.location.hash)
}

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found in document')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
