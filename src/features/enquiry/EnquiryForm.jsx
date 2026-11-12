import { useEffect, useId, useRef, useState } from 'react'
import { useProducts } from '../products'
import { sendToSheet, telLink, whatsappLink } from '../utils'
import { CheckIcon } from './Icons'
import Section from './Section'

const EMPTY = { name: '', mobile: '', village: '', pincode: '', product: '', quantity: '', message: '' }
const FIELDS = ['name', 'mobile', 'village', 'pincode', 'product', 'quantity'] // form order, for focusing the first error

// Returns the error message for one field, or undefined if it is fine
function fieldError(name, value, f) {
  const v = value.trim()
  switch (name) {
    case 'name':
      if (!v) return f.errName
      if (v.length < 2 || !/^[\p{L}\p{M}][\p{L}\p{M} .']*$/u.test(v)) return f.errNameInvalid
      return
    case 'mobile':
      return /^[6-9]\d{9}$/.test(v) ? undefined : f.errMobile
    case 'village':
      if (!v) return f.errAddress
      return v.length < 5 ? f.errAddressShort : undefined
    case 'pincode':
      return /^[1-9]\d{5}$/.test(v) ? undefined : f.errPincode
    case 'product':
      return v.length < 2 ? f.errProduct : undefined
    case 'quantity':
      return /[1-9]/.test(v) ? undefined : f.errQuantity
  }
}

export default function EnquiryForm({ t, lang }) {
  return (
    <Section id="enquiry" title={t.enquiryTitle} subtitle={t.enquiryText} className="bg-brand-50">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-5 shadow-sm ring-1 ring-brand-100 sm:p-8">
        <EnquiryFields t={t} lang={lang} />
      </div>
    </Section>
  )
}

// The form itself — used in the Enquiry section and in the Order Now popup.
export function EnquiryFields({ t, lang, selectedProduct }) {
  const f = t.form
  const products = useProducts()
  const uid = useId() // keeps input ids unique when the form appears twice
  const [data, setData] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error | setup
  const nameRef = useRef(null)

  // "Order Now" fills the product and quantity fields
  useEffect(() => {
    if (!selectedProduct) return
    setData((d) => ({
      ...d,
      product: selectedProduct.name || d.product,
      quantity: selectedProduct.quantity || d.quantity,
    }))
    setStatus('idle')
    nameRef.current?.focus({ preventScroll: true })
  }, [selectedProduct])

  const update = (e) => {
    const { name, value } = e.target
    const digits = { mobile: 10, pincode: 6 }[name]
    const next = digits ? value.replace(/\D/g, '').slice(0, digits) : value
    setData((d) => ({ ...d, [name]: next }))
    // once a field shows an error, re-check it as the user types
    setErrors((er) => (er[name] ? { ...er, [name]: fieldError(name, next, f) } : er))
  }

  // check a field when the user leaves it (skipped if left empty, so tabbing past doesn't nag)
  const blur = (e) => {
    const { name, value } = e.target
    if (FIELDS.includes(name) && value.trim()) setErrors((er) => ({ ...er, [name]: fieldError(name, value, f) }))
  }

  const validate = () => {
    const er = {}
    FIELDS.forEach((k) => {
      const msg = fieldError(k, data[k], f)
      if (msg) er[k] = msg
    })
    setErrors(er)
    const first = FIELDS.find((k) => er[k])
    if (first) document.getElementById(`${uid}-${first}`)?.focus()
    return !first
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')
    try {
      const result = await sendToSheet({ ...data, language: lang })
      setStatus(result)
      if (result === 'done') {
        setData(EMPTY)
        setErrors({})
      }
    } catch {
      setStatus('error')
    }
  }

  const base = 'w-full rounded-xl border-2 bg-white px-4 py-3 text-base outline-none'
  const field = `${base} border-gray-200 focus:border-brand-600`
  const cls = (k) => (errors[k] ? `${base} border-red-500 focus:border-red-600` : field)
  const err = (k) => ({ onBlur: blur, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${uid}-${k}-err` : undefined })
  const errText = (k) => errors[k] && <p id={`${uid}-${k}-err`} className="mt-1 text-sm text-red-600">{errors[k]}</p>
  const label = 'mb-1 block text-sm font-bold text-gray-700'

  return status === 'done' ? (
    <div className="py-8 text-center" role="status">
      <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
        <CheckIcon className="h-9 w-9" />
      </span>
      <p className="text-xl font-extrabold text-brand-900">{f.thanks}</p>
      <button type="button" onClick={() => setStatus('idle')} className="mt-6 font-bold text-brand-700 underline">
        {f.sendAnother}
      </button>
    </div>
  ) : (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor={`${uid}-name`} className={label}>{f.name} *</label>
        <input ref={nameRef} id={`${uid}-name`} name="name" value={data.name} onChange={update} autoComplete="name" className={cls('name')} {...err('name')} />
        {errText('name')}
      </div>
      <div>
        <label htmlFor={`${uid}-mobile`} className={label}>{f.mobile} *</label>
        <input id={`${uid}-mobile`} name="mobile" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={data.mobile} onChange={update} placeholder="98XXXXXXXX" className={cls('mobile')} {...err('mobile')} />
        {errText('mobile')}
      </div>
      <div>
        <label htmlFor={`${uid}-village`} className={label}>{f.address} *</label>
        <input id={`${uid}-village`} name="village" value={data.village} onChange={update} autoComplete="street-address" placeholder={f.addressPh} className={cls('village')} {...err('village')} />
        {errText('village')}
      </div>
      <div>
        <label htmlFor={`${uid}-pincode`} className={label}>{f.pincode} *</label>
        <input id={`${uid}-pincode`} name="pincode" type="tel" inputMode="numeric" autoComplete="postal-code" maxLength={6} value={data.pincode} onChange={update} placeholder="854317" className={cls('pincode')} {...err('pincode')} />
        {errText('pincode')}
      </div>
      <div>
        <label htmlFor={`${uid}-product`} className={label}>{f.product} *</label>
        <input id={`${uid}-product`} name="product" list={`${uid}-products`} value={data.product} onChange={update} placeholder={f.productPh} className={cls('product')} {...err('product')} />
        <datalist id={`${uid}-products`}>
          {products.map((p) => <option key={p.id} value={p.name.en} />)}
        </datalist>
        {errText('product')}
      </div>
      <div>
        <label htmlFor={`${uid}-quantity`} className={label}>{f.quantity} *</label>
        <input id={`${uid}-quantity`} name="quantity" value={data.quantity} onChange={update} placeholder={f.quantityPh} className={cls('quantity')} {...err('quantity')} />
        {errText('quantity')}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${uid}-message`} className={label}>{f.remark}</label>
        <textarea id={`${uid}-message`} name="message" rows={3} maxLength={500} value={data.message} onChange={update} placeholder={f.messagePh} className={field} />
      </div>

      {(status === 'error' || status === 'setup') && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2" role="alert">
          {status === 'setup' ? f.errSetup : f.errSend}{' '}
          <a href={telLink} className="font-bold underline">{t.call}</a> ·{' '}
          <a href={whatsappLink(data.product)} target="_blank" rel="noopener noreferrer" className="font-bold underline">{t.whatsapp}</a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-xl bg-brand-700 py-4 text-lg font-extrabold text-white hover:bg-brand-800 disabled:opacity-60 sm:col-span-2"
      >
        {status === 'sending' ? f.sending : f.submit}
      </button>
    </form>
  )
}
