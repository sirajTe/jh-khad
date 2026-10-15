import { GOOGLE_SCRIPT_URL } from '../config'

// The admin panel talks to the same Apps Script as the website. The email and
// password go with every request and are checked by the script, so nothing
// can be read or changed without them.

const SESSION_KEY = 'admin-login'

export function savedLogin() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

export function rememberLogin(login) {
  try {
    if (login) sessionStorage.setItem(SESSION_KEY, JSON.stringify(login))
    else sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // storage blocked — the admin just logs in again after a refresh
  }
}

export class DeniedError extends Error {}

// An older script (before the admin panel) would save a login POST as an
// enquiry — password included — so check the script is updated first.
export async function scriptSupportsAdmin() {
  const res = await fetch(GOOGLE_SCRIPT_URL)
  const data = await res.json()
  return data.admin === true
}

// A form-encoded POST is a "simple" request, so the browser can read
// Apps Script's JSON answer without a CORS preflight.
export async function call(login, action, fields = {}) {
  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: new URLSearchParams({ ...fields, action, email: login.email, password: login.password }),
  })
  const data = await res.json()
  if (data.result === 'denied') throw new DeniedError('Wrong email or password')
  if (data.result !== 'ok') throw new Error(data.error || 'Something went wrong')
  return data
}
