import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { findPolicy } from './policies'
import { productIdFromPath } from './products'
import './index.css'

// Unknown paths (e.g. /app/login) are tidied back to home. Policy pages and
// product details keep their address so they can be opened and shared.
const home = import.meta.env.BASE_URL
const path = window.location.pathname
const keep =
  path === home || path === home + 'index.html' || findPolicy(path) || productIdFromPath(path)
if (!keep) {
  window.history.replaceState(null, '', home + window.location.search + window.location.hash)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
