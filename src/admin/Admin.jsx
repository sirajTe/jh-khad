import { useCallback, useEffect, useState } from 'react'
import { SHOP } from '../config'
import { call, DeniedError, rememberLogin, savedLogin, scriptSupportsAdmin } from './api'

const CATEGORIES = ['fertilizer', 'pesticide', 'seed']
const EMPTY_PRODUCT = {
  id: '', category: 'fertilizer', name_en: '', name_hi: '', use_en: '', use_hi: '',
  packs: '', prices: '', offer: '', image: '', active: 'yes',
}

const input = 'w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-base outline-none focus:border-brand-600'
const label = 'mb-1 block text-sm font-bold text-gray-700'
const btn = 'rounded-lg px-4 py-2 font-bold disabled:opacity-50'
const btnPrimary = `${btn} bg-brand-700 text-white hover:bg-brand-800`
const btnGhost = `${btn} bg-gray-100 text-gray-800 hover:bg-gray-200`

const isHidden = (p) => /^(no|n|false|0|hide)$/i.test(String(p.active || '').trim())

export default function Admin() {
  const [login, setLogin] = useState(savedLogin)

  useEffect(() => {
    document.title = `Admin – ${SHOP.name}`
  }, [])

  const logout = useCallback(() => {
    rememberLogin(null)
    setLogin(null)
  }, [])

  if (!login) {
    return (
      <LoginForm
        onLogin={(l) => {
          rememberLogin(l)
          setLogin(l)
        }}
      />
    )
  }
  return <Dashboard login={login} onLogout={logout} />
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const l = { email: email.trim(), password }
    try {
      if (!(await scriptSupportsAdmin())) {
        return setError('The Google Apps Script is the old version. Paste the new Code.gs and deploy a New version (see README).')
      }
      await call(l, 'login')
      onLogin(l)
    } catch (err) {
      setError(err instanceof DeniedError ? 'Wrong email or password.' : 'Could not reach the Google Sheet. Check the internet and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-100">
        <h1 className="text-xl font-extrabold text-brand-900">{SHOP.name}</h1>
        <p className="mb-5 text-sm text-gray-500">Admin panel — please log in</p>
        <label className={label} htmlFor="email">Email</label>
        <input id="email" type="email" required autoComplete="username" className={`${input} mb-4`} value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className={label} htmlFor="password">Password</label>
        <input id="password" type="password" required autoComplete="current-password" className={`${input} mb-4`} value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="mb-4 text-sm font-semibold text-red-600" role="alert">{error}</p>}
        <button type="submit" disabled={busy} className={`${btnPrimary} w-full py-3`}>
          {busy ? 'Checking…' : 'Log in'}
        </button>
      </form>
    </div>
  )
}

function Dashboard({ login, onLogout }) {
  const [tab, setTab] = useState('products')

  // Any request that comes back "denied" (password changed in the script) logs out
  const request = useCallback(
    async (action, fields) => {
      try {
        return await call(login, action, fields)
      } catch (err) {
        if (err instanceof DeniedError) onLogout()
        throw err
      }
    },
    [login, onLogout],
  )

  const tabClass = (name) =>
    `rounded-lg px-4 py-2 font-bold ${tab === name ? 'bg-white text-brand-900' : 'text-white hover:bg-brand-800'}`

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-brand-900 text-white shadow">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3">
          <span className="mr-auto font-extrabold">{SHOP.name} · Admin</span>
          <nav className="flex gap-1">
            <button className={tabClass('products')} onClick={() => setTab('products')}>Products</button>
            <button className={tabClass('orders')} onClick={() => setTab('orders')}>Orders</button>
          </nav>
          <button className="rounded-lg px-3 py-2 text-sm font-semibold text-brand-100 hover:bg-brand-800" onClick={onLogout}>
            Log out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        {tab === 'products' ? <ProductsTab request={request} /> : <OrdersTab request={request} />}
      </main>
    </div>
  )
}

// Loads a list from the script; returns [list, loading, error, reload]
function useList(request, action, key) {
  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await request(action)
      setList(data[key])
    } catch (err) {
      setError(String(err.message || err))
    } finally {
      setLoading(false)
    }
  }, [request, action, key])

  useEffect(() => {
    load()
  }, [load])

  return [list, loading, error, load]
}

function Toolbar({ title, count, loading, onReload, children }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <h2 className="mr-auto text-2xl font-extrabold text-brand-900">
        {title} {count != null && <span className="text-base font-semibold text-gray-500">({count})</span>}
      </h2>
      {children}
      <button className={btnGhost} onClick={onReload} disabled={loading}>
        {loading ? 'Loading…' : 'Refresh'}
      </button>
    </div>
  )
}

function ErrorBox({ error }) {
  return error ? <p className="mb-4 rounded-lg bg-red-50 p-3 font-semibold text-red-700" role="alert">{error}</p> : null
}

// ---------------- Products ----------------

function ProductsTab({ request }) {
  const [products, loading, error, reload] = useList(request, 'admin_products', 'products')
  const [editing, setEditing] = useState(null) // product row being edited, or EMPTY_PRODUCT for a new one
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const q = search.trim().toLowerCase()
  const shown = (products || []).filter(
    (p) =>
      (category === 'all' || String(p.category).toLowerCase() === category) &&
      (!q || [p.id, p.name_en, p.name_hi].some((v) => String(v || '').toLowerCase().includes(q))),
  )

  return (
    <>
      <Toolbar title="Products" count={products?.length} loading={loading} onReload={reload}>
        <button className={btnPrimary} onClick={() => setEditing(EMPTY_PRODUCT)}>+ Add product</button>
      </Toolbar>
      <div className="mb-4 flex flex-wrap gap-2">
        <input className={`${input} max-w-xs`} placeholder="Search name or id…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className={`${input} w-auto`} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <ErrorBox error={error} />
      {products && !shown.length && <p className="text-gray-500">No products found.</p>}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <article key={p.row} className={`flex gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-200 ${isHidden(p) ? 'opacity-60' : ''}`}>
            {p.image ? (
              <img src={p.image} alt="" loading="lazy" className="h-20 w-20 shrink-0 rounded-lg bg-gray-100 object-cover" />
            ) : (
              <div className="h-20 w-20 shrink-0 rounded-lg bg-brand-50" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-2">
                <h3 className="min-w-0 flex-1 truncate font-bold text-gray-900">{p.name_en || '(no name)'}</h3>
                {isHidden(p) && <span className="rounded bg-gray-200 px-1.5 text-xs font-bold text-gray-600">HIDDEN</span>}
              </div>
              <p className="truncate text-sm text-gray-500">{p.name_hi}</p>
              <p className="text-xs font-semibold uppercase text-brand-700">{p.category}{Number(p.offer) > 0 && ` · ${p.offer}% off`}</p>
              <p className="truncate text-sm text-gray-700">{p.packs}</p>
              <p className="truncate text-sm text-gray-700">{p.prices ? `₹ ${p.prices}` : 'Price on Request'}</p>
            </div>
            <button className={`${btnGhost} self-start px-3 py-1 text-sm`} onClick={() => setEditing(p)}>Edit</button>
          </article>
        ))}
      </div>

      {editing && (
        <ProductForm
          product={editing}
          request={request}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null)
            reload()
          }}
        />
      )}
    </>
  )
}

function ProductForm({ product, request, onClose, onSaved }) {
  const isNew = !product.row
  const [data, setData] = useState(() => ({ ...EMPTY_PRODUCT, ...product, active: isHidden(product) ? 'no' : 'yes' }))
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }))

  const packCount = data.packs.split(',').filter((s) => s.trim()).length
  const priceCount = data.prices.split(',').filter((s) => s.trim()).length
  const priceWarning = priceCount > 0 && priceCount !== packCount
    ? `${packCount} pack(s) but ${priceCount} price(s) — the website will show "Price on Request".`
    : ''

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!data.name_en.trim() || !data.packs.trim()) return setError('Name (English) and Packs are required.')
    setBusy(true)
    try {
      const { row, ...fields } = data
      await request('save_product', { row: row || '', product: JSON.stringify(fields) })
      onSaved()
    } catch (err) {
      setError(String(err.message || err))
      setBusy(false)
    }
  }

  const field = (key, title, props = {}) => (
    <div>
      <label className={label} htmlFor={`f-${key}`}>{title}</label>
      <input id={`f-${key}`} className={input} value={data[key]} onChange={set(key)} {...props} />
    </div>
  )

  return (
    <div className="fixed inset-0 z-20 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-6" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl"
      >
        <h2 className="mb-4 text-xl font-extrabold text-brand-900">{isNew ? 'Add product' : `Edit: ${product.name_en}`}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {field('name_en', 'Name (English) *', { required: true })}
          {field('name_hi', 'Name (Hindi)')}
          {field('use_en', 'Use (English)')}
          {field('use_hi', 'Use (Hindi)')}
          <div>
            <label className={label} htmlFor="f-category">Category</label>
            <select id="f-category" className={input} value={data.category} onChange={set('category')}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {field('id', 'ID', { placeholder: 'Blank = made from the name', disabled: !isNew && !!product.id })}
          {field('packs', 'Packs *', { required: true, placeholder: '1 kg, 4 kg, 5 kg' })}
          {field('prices', 'Prices (₹, same order as packs)', { placeholder: '350, 1300, 1600' })}
          {field('offer', 'Offer %', { type: 'number', min: 0, max: 99, placeholder: '0' })}
          <div>
            <label className={label} htmlFor="f-active">Show on website</label>
            <select id="f-active" className={input} value={data.active} onChange={set('active')}>
              <option value="yes">Yes — show</option>
              <option value="no">No — hide</option>
            </select>
          </div>
          <div className="sm:col-span-2">{field('image', 'Image link', { placeholder: 'https://… (blank = category photo)' })}</div>
        </div>
        {!isNew && product.id && <p className="mt-2 text-xs text-gray-500">The ID can't be changed — customers' carts use it.</p>}
        {priceWarning && <p className="mt-3 text-sm font-semibold text-amber-700">{priceWarning}</p>}
        {error && <p className="mt-3 text-sm font-semibold text-red-600" role="alert">{error}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className={btnGhost} onClick={onClose}>Cancel</button>
          <button type="submit" className={btnPrimary} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}

// ---------------- Orders ----------------

const isOrder = (o) => String(o.Product || '').startsWith('ORDER')

function OrdersTab({ request }) {
  const [orders, loading, error, reload] = useList(request, 'orders', 'orders')
  const [kind, setKind] = useState('orders') // orders | enquiries | all
  const [search, setSearch] = useState('')

  const q = search.trim().toLowerCase()
  const shown = (orders || []).filter(
    (o) =>
      (kind === 'all' || (kind === 'orders') === isOrder(o)) &&
      (!q || Object.values(o).some((v) => String(v).toLowerCase().includes(q))),
  )

  return (
    <>
      <Toolbar title="Orders" count={shown.length} loading={loading} onReload={reload} />
      <div className="mb-4 flex flex-wrap gap-2">
        <select className={`${input} w-auto`} value={kind} onChange={(e) => setKind(e.target.value)}>
          <option value="orders">Cart orders</option>
          <option value="enquiries">Enquiries</option>
          <option value="all">All</option>
        </select>
        <input className={`${input} max-w-xs`} placeholder="Search name, mobile, village…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <ErrorBox error={error} />
      {orders && !shown.length && <p className="text-gray-500">Nothing here yet.</p>}

      <div className="grid gap-3 lg:grid-cols-2">
        {shown.map((o, i) => (
          <article key={i} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
            <div className="mb-2 flex flex-wrap items-baseline gap-x-3">
              <h3 className="font-bold text-gray-900">{o.Name || '(no name)'}</h3>
              <span className="text-sm text-gray-500">{o['Date & Time']}</span>
              {isOrder(o) && <span className="ml-auto rounded bg-brand-100 px-2 text-xs font-bold text-brand-800">ORDER</span>}
            </div>
            <p className="text-sm text-gray-700">
              {o.Mobile && <a className="font-semibold text-brand-700 underline" href={`tel:${o.Mobile}`}>{o.Mobile}</a>}
              {o.Village && ` · ${o.Village}`}
            </p>
            {o.Product && <p className="mt-2 whitespace-pre-wrap text-sm text-gray-900">{o.Product}</p>}
            {o.Quantity && <p className="mt-1 text-sm font-bold text-gray-900">{o.Quantity}</p>}
            {o.Message && <p className="mt-1 whitespace-pre-wrap text-sm text-gray-600">{o.Message}</p>}
          </article>
        ))}
      </div>
    </>
  )
}
