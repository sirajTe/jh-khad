import { useEffect, useId, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { SHOP } from '../config'
import { cartCount, cartLines, newOrderId } from '../cart'
import { useProducts } from '../products'
import { contactErrors, formatRupees, sendToSheet, telLink, whatsappTextLink } from '../utils'
import { AddButton } from './Products'
import { CartIcon, CheckIcon, CloseIcon } from './Icons'
import { LazyImg } from './Section'

const EMPTY = { name: '', mobile: '', village: '', message: '', payment: 'cod' } // payment: cod | upi

// Totals for priced items; items without a price are confirmed on the phone
function totals(lines) {
  let pay = 0
  let mrp = 0
  for (const l of lines) {
    if (l.price == null) continue
    pay += l.lineTotal
    mrp += l.product.prices[l.product.packs.indexOf(l.pack)] * l.qty
  }
  return { pay, save: mrp - pay, onRequest: lines.some((l) => l.price == null) }
}

// One line per item, used for the sheet, the email alert and WhatsApp
function orderSummary(lines) {
  return lines
    .map((l) => `${l.product.name.en} (${l.pack}) × ${l.qty}${l.price == null ? ' — price on request' : ` = ${formatRupees(l.lineTotal)}`}`)
    .join('\n')
}

// Green bar fixed to the bottom of the screen while the cart has items
export function CartBar({ t, items, onOpen }) {
  const products = useProducts()
  const count = cartCount(items)
  if (!count) return null
  const { pay } = totals(cartLines(items, products))

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4">
      <button
        type="button"
        onClick={onOpen}
        className="mx-auto flex w-full max-w-xl items-center justify-between gap-3 rounded-2xl bg-brand-700 px-4 py-3 text-left text-white shadow-2xl hover:bg-brand-800"
      >
        <span className="flex items-center gap-3">
          <span className="rounded-lg bg-white/15 p-2">
            <CartIcon />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">{count} {count === 1 ? t.cart.item : t.cart.items}</span>
            {pay > 0 && <span className="block text-lg font-extrabold">{formatRupees(pay)}</span>}
          </span>
        </span>
        <span className="text-base font-extrabold">{t.cart.view} ›</span>
      </button>
    </div>
  )
}

// Slide-in cart panel: cart → checkout → order placed
export function CartPanel({ t, lang, cart, open, onClose }) {
  const ref = useRef(null)
  const uid = useId()
  const [step, setStep] = useState('cart') // cart | checkout | done
  const [data, setData] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | error | setup
  const [placed, setPlaced] = useState(null) // { id, summary, pay, onRequest, upi } after placing

  const c = t.cart
  const f = t.form
  const products = useProducts()
  const lines = cartLines(cart.items, products)
  const { pay, save, onRequest } = totals(lines)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) {
      setStep(cart.items.length ? 'cart' : placed ? 'done' : 'cart')
      setStatus('idle')
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
    }
  }, [open])

  const handleClose = () => {
    document.documentElement.style.overflow = ''
    if (step === 'done') setPlaced(null)
    onClose()
  }

  const update = (e) => {
    const { name, value } = e.target
    setData((d) => ({ ...d, [name]: name === 'mobile' ? value.replace(/\D/g, '').slice(0, 10) : value }))
    setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    const er = contactErrors(data, f)
    setErrors(er)
    if (Object.keys(er).length) return

    const id = newOrderId()
    const summary = orderSummary(lines)
    setStatus('sending')
    try {
      const result = await sendToSheet({
        name: data.name,
        mobile: data.mobile,
        village: data.village,
        product: `ORDER ${id}\n${summary}`,
        quantity: `${cartCount(cart.items)} items · ${formatRupees(pay)}${onRequest ? ' + price on request' : ''}`,
        message: `Payment: ${data.payment === 'upi' ? 'UPI' : 'Cash at shop / delivery'}${data.message ? `\n${data.message}` : ''}`,
        language: lang,
      })
      if (result === 'setup') return setStatus('setup')
      setPlaced({ id, summary, pay, onRequest, upi: data.payment === 'upi' })
      setData((d) => ({ ...d, message: '' }))
      cart.clear()
      setStep('done')
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  const whatsappOrder = whatsappTextLink(
    `Hello, I want to order:\n${orderSummary(lines)}\nTotal: ${formatRupees(pay)}${data.name ? `\nName: ${data.name}` : ''}${data.village ? `\nVillage: ${data.village}` : ''}`,
  )

  const field = 'w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base outline-none focus:border-brand-600'
  const label = 'mb-1 block text-sm font-bold text-gray-700'
  const title = step === 'checkout' ? c.checkout : step === 'done' ? c.placedTitle : c.title

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      aria-labelledby={`${uid}-title`}
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-md bg-gray-50 p-0 shadow-2xl backdrop:bg-black/60"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-3">
          {step === 'checkout' && (
            <button type="button" onClick={() => setStep('cart')} aria-label={c.back} className="rounded-full p-2 text-xl font-bold text-brand-900 hover:bg-gray-100">
              ‹
            </button>
          )}
          <h2 id={`${uid}-title`} className="flex-1 text-lg font-extrabold text-brand-900">{title}</h2>
          <button type="button" onClick={() => ref.current.close()} aria-label={t.close} className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800">
            <CloseIcon />
          </button>
        </div>

        {step === 'done' && placed ? (
          <div className="flex-1 overflow-y-auto p-6 text-center" role="status">
            <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <CheckIcon className="h-9 w-9" />
            </span>
            <p className="text-xl font-extrabold text-brand-900">{c.placed}</p>
            <p className="mt-3 text-gray-600">{c.orderId}</p>
            <p className="mt-1 select-all rounded-xl bg-white py-3 font-mono text-2xl font-extrabold tracking-wider text-brand-800 ring-1 ring-brand-100">
              {placed.id}
            </p>
            <p className="mt-3 text-sm text-gray-600">{c.placedText}</p>
            {placed.upi && <UpiPay t={t} orderId={placed.id} amount={placed.onRequest ? null : placed.pay} />}
            <pre className="mt-5 whitespace-pre-wrap rounded-xl bg-white p-4 text-left font-sans text-sm text-gray-700 ring-1 ring-gray-200">{placed.summary}</pre>
            <button type="button" onClick={() => ref.current.close()} className="mt-6 w-full rounded-xl bg-brand-700 py-3 font-extrabold text-white hover:bg-brand-800">
              {c.continue}
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <span className="mb-4 rounded-full bg-brand-100 p-5 text-brand-700">
              <CartIcon className="h-10 w-10" />
            </span>
            <p className="text-lg font-extrabold text-brand-900">{c.empty}</p>
            <p className="mt-1 text-gray-600">{c.emptyText}</p>
            <a href="/#products" onClick={() => ref.current.close()} className="mt-6 rounded-xl bg-brand-700 px-6 py-3 font-extrabold text-white hover:bg-brand-800">
              {c.browse}
            </a>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {step === 'cart' ? (
                <>
                  <ul className="divide-y divide-gray-100 rounded-2xl bg-white ring-1 ring-gray-200">
                    {lines.map((l) => {
                      const name = l.product.name[lang] || l.product.name.en
                      return (
                        <li key={`${l.id}|${l.pack}`} className="flex items-center gap-3 p-3">
                          <LazyImg src={l.product.image} alt="" className="h-14 w-14 shrink-0 rounded-lg" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-bold text-brand-900">{name}</p>
                            <p className="text-sm text-gray-500">{l.pack}</p>
                            <p className="text-sm font-extrabold text-brand-900">
                              {l.price == null ? <span className="text-gold-600">{t.priceOnRequest}</span> : formatRupees(l.lineTotal)}
                            </p>
                          </div>
                          <AddButton small t={t} qty={l.qty} label={name} onChange={(q) => cart.setQty(l.id, l.pack, q)} />
                        </li>
                      )
                    })}
                  </ul>

                  <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-200">
                    <h3 className="mb-2 font-extrabold text-brand-900">{c.bill}</h3>
                    <dl className="space-y-1.5 text-sm">
                      <div className="flex justify-between"><dt className="text-gray-600">{c.itemTotal}</dt><dd className="font-semibold">{formatRupees(pay + save)}</dd></div>
                      {save > 0 && (
                        <div className="flex justify-between text-brand-600"><dt>{c.discount}</dt><dd className="font-semibold">− {formatRupees(save)}</dd></div>
                      )}
                      <div className="flex justify-between border-t border-dashed border-gray-200 pt-2 text-base"><dt className="font-extrabold">{c.toPay}</dt><dd className="font-extrabold">{formatRupees(pay)}</dd></div>
                    </dl>
                    {onRequest && <p className="mt-2 text-xs text-gold-600">{c.onRequestNote}</p>}
                  </div>
                  {save > 0 && (
                    <p className="rounded-xl bg-brand-50 p-3 text-center text-sm font-bold text-brand-700 ring-1 ring-brand-100">
                      {c.saving} {formatRupees(save)}
                    </p>
                  )}
                </>
              ) : (
                <form id={`${uid}-form`} onSubmit={placeOrder} noValidate className="space-y-4 rounded-2xl bg-white p-4 ring-1 ring-gray-200">
                  <div>
                    <label htmlFor={`${uid}-name`} className={label}>{f.name} *</label>
                    <input id={`${uid}-name`} name="name" value={data.name} onChange={update} autoComplete="name" className={field} />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor={`${uid}-mobile`} className={label}>{f.mobile} *</label>
                    <input id={`${uid}-mobile`} name="mobile" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={data.mobile} onChange={update} placeholder="98XXXXXXXX" className={field} />
                    {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                  </div>
                  <div>
                    <label htmlFor={`${uid}-village`} className={label}>{c.address} *</label>
                    <input id={`${uid}-village`} name="village" value={data.village} onChange={update} className={field} />
                    {errors.village && <p className="mt-1 text-sm text-red-600">{errors.village}</p>}
                  </div>
                  <div>
                    <label htmlFor={`${uid}-message`} className={label}>{c.note}</label>
                    <textarea id={`${uid}-message`} name="message" rows={2} value={data.message} onChange={update} className={field} />
                  </div>
                  {SHOP.upi && (
                    <fieldset>
                      <legend className={label}>{c.payment}</legend>
                      <div className="space-y-2">
                        {['cod', 'upi'].map((m) => (
                          <label
                            key={m}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 ${
                              data.payment === m ? 'border-brand-600 bg-brand-50' : 'border-gray-200'
                            }`}
                          >
                            <input type="radio" name="payment" value={m} checked={data.payment === m} onChange={update} className="h-5 w-5 accent-brand-700" />
                            <span className="leading-tight">
                              <span className="block font-bold text-brand-900">{m === 'upi' ? c.payUpi : c.payCod}</span>
                              {m === 'upi' && <span className="text-xs text-gray-500">{c.payUpiHint}</span>}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}
                  <p className="text-sm text-gray-600">{c.confirmNote}</p>
                  {(status === 'error' || status === 'setup') && (
                    <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">
                      {status === 'setup' ? f.errSetup : f.errSend}{' '}
                      <a href={telLink} className="font-bold underline">{t.call}</a> ·{' '}
                      <a href={whatsappOrder} target="_blank" rel="noopener noreferrer" className="font-bold underline">{t.whatsapp}</a>
                    </div>
                  )}
                </form>
              )}
            </div>

            <div className="border-t border-gray-200 bg-white p-4">
              {step === 'cart' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setStep('checkout')}
                    className="flex w-full items-center justify-between rounded-xl bg-brand-700 px-5 py-3.5 font-extrabold text-white hover:bg-brand-800"
                  >
                    <span>{formatRupees(pay)}</span>
                    <span>{c.proceed} ›</span>
                  </button>
                  <a
                    href={whatsappOrder}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-center text-sm font-bold text-brand-700 underline"
                  >
                    {c.viaWhatsapp}
                  </a>
                </>
              ) : (
                <button
                  type="submit"
                  form={`${uid}-form`}
                  disabled={status === 'sending'}
                  className="flex w-full items-center justify-between rounded-xl bg-gold-400 px-5 py-3.5 font-extrabold text-brand-950 hover:bg-gold-300 disabled:opacity-60"
                >
                  <span>{formatRupees(pay)}</span>
                  <span>{status === 'sending' ? f.sending : `${c.place} ›`}</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </dialog>
  )
}

// UPI payment for a placed order: app button (phones), QR code (desktop), copyable ID.
// amount is null when some items are price on request — the payer then types it.
function UpiPay({ t, orderId, amount }) {
  const c = t.cart
  const [qr, setQr] = useState('')
  const [copied, setCopied] = useState(false)

  const params = new URLSearchParams({ pa: SHOP.upi, pn: SHOP.name, cu: 'INR', tn: `Order ${orderId}` })
  if (amount) params.set('am', amount.toFixed(2))
  const link = `upi://pay?${params.toString().replace(/\+/g, '%20').replace('%40', '@')}`

  useEffect(() => {
    QRCode.toDataURL(link, { width: 240, margin: 1 }).then(setQr, () => setQr(''))
  }, [link])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SHOP.upi)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked — the ID is selectable text anyway
    }
  }

  return (
    <div className="mt-5 rounded-2xl bg-white p-4 text-center ring-1 ring-gray-200">
      <h3 className="font-extrabold text-brand-900">{c.payTitle}</h3>
      {amount ? (
        <a href={link} className="mt-3 block rounded-xl bg-gold-400 py-3 font-extrabold text-brand-950 hover:bg-gold-300">
          {c.payButton} {formatRupees(amount)} {c.payButtonApp}
        </a>
      ) : (
        <p className="mt-2 text-sm text-gold-600">{c.payLaterNote}</p>
      )}
      {qr && (
        <>
          <p className="mt-4 text-sm text-gray-600">{c.scanQr}</p>
          <img src={qr} alt={`UPI QR ${SHOP.upi}`} className="mx-auto mt-2 h-48 w-48" />
        </>
      )}
      <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
        <span className="min-w-0 text-left">
          <span className="block text-xs text-gray-500">{c.upiId}</span>
          <span className="block select-all truncate font-mono font-bold text-brand-900">{SHOP.upi}</span>
        </span>
        <button type="button" onClick={copy} className="shrink-0 rounded-lg border-2 border-brand-700 px-3 py-1 text-sm font-bold text-brand-700 hover:bg-brand-50">
          {copied ? c.copied : c.copy}
        </button>
      </div>
      <p className="mt-3 text-sm text-gray-600">{c.payNote}</p>
      <a
        href={whatsappTextLink(`Payment done for order ${orderId}${amount ? ` (${formatRupees(amount)})` : ''}. Screenshot attached.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-sm font-bold text-brand-700 underline"
      >
        {c.sendProof}
      </a>
    </div>
  )
}
