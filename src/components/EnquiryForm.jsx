import { useEffect, useId, useRef, useState } from 'react'
import { GOOGLE_SCRIPT_URL, PRODUCTS } from '../config'
import { telLink, whatsappLink } from '../utils'
import { CheckIcon } from './Icons'
import Section from './Section'

const EMPTY = { name: '', mobile: '', village: '', product: '', quantity: '', message: '' }

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
    setData((d) => ({ ...d, [name]: name === 'mobile' ? value.replace(/\D/g, '').slice(0, 10) : value }))
    setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!data.name.trim()) er.name = f.errName
    if (!/^[6-9]\d{9}$/.test(data.mobile)) er.mobile = f.errMobile
    if (!data.village.trim()) er.village = f.errVillage
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'GOOGLE_SCRIPT_URL') {
      console.warn('Set GOOGLE_SCRIPT_URL in src/config.js to receive enquiries in Google Sheets.')
      setStatus('setup')
      return
    }

    setStatus('sending')
    try {
      // Apps Script does not send CORS headers, so we post "no-cors" as a
      // simple form. The data still reaches the sheet.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({ ...data, language: lang }),
      })
      setStatus('done')
      setData(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const field = 'w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base outline-none focus:border-brand-600'
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
        <input ref={nameRef} id={`${uid}-name`} name="name" value={data.name} onChange={update} autoComplete="name" className={field} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor={`${uid}-mobile`} className={label}>{f.mobile} *</label>
        <input id={`${uid}-mobile`} name="mobile" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={data.mobile} onChange={update} placeholder="98XXXXXXXX" className={field} />
        {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
      </div>
      <div>
        <label htmlFor={`${uid}-village`} className={label}>{f.village} *</label>
        <input id={`${uid}-village`} name="village" value={data.village} onChange={update} className={field} />
        {errors.village && <p className="mt-1 text-sm text-red-600">{errors.village}</p>}
      </div>
      <div>
        <label htmlFor={`${uid}-product`} className={label}>{f.product}</label>
        <input id={`${uid}-product`} name="product" list={`${uid}-products`} value={data.product} onChange={update} placeholder={f.productPh} className={field} />
        <datalist id={`${uid}-products`}>
          {PRODUCTS.map((p) => <option key={p.id} value={p.name.en} />)}
        </datalist>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${uid}-quantity`} className={label}>{f.quantity}</label>
        <input id={`${uid}-quantity`} name="quantity" value={data.quantity} onChange={update} placeholder={f.quantityPh} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${uid}-message`} className={label}>{f.message}</label>
        <textarea id={`${uid}-message`} name="message" rows={3} value={data.message} onChange={update} placeholder={f.messagePh} className={field} />
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
