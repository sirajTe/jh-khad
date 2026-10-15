import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Admin from './admin/Admin.jsx'
import './index.css'

// This branch only serves the admin panel (the website in App.jsx is not shown).
// This is a one-page site: if it was opened at any other path
// (e.g. /app/login), tidy the address bar back to the home page.
const home = import.meta.env.BASE_URL
if (window.location.pathname !== home && window.location.pathname !== home + 'index.html') {
  window.history.replaceState(null, '', home + window.location.search + window.location.hash)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Admin />
  </StrictMode>,
)
