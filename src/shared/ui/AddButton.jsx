// Quick-commerce style button: "ADD", then a − qty + counter once in the cart
export default function AddButton({ t, qty, label, onChange, small = false }) {
  const size = small ? 'h-8 min-w-[5.5rem] text-sm' : 'h-10 min-w-[6.5rem] text-base'
  if (!qty) {
    return (
      <button
        type="button"
        onClick={() => onChange(1)}
        aria-label={`${t.add} ${label}`}
        className={`${size} shrink-0 rounded-lg border-2 border-brand-700 bg-brand-50 px-4 font-extrabold text-brand-700 hover:bg-brand-100`}
      >
        {t.add}
      </button>
    )
  }
  return (
    <div className={`${size} flex shrink-0 items-center justify-between rounded-lg bg-brand-700 font-extrabold text-white`}>
      <button type="button" onClick={() => onChange(qty - 1)} aria-label={`${t.remove} ${label}`} className="h-full w-8 rounded-l-lg hover:bg-brand-800">
        −
      </button>
      <span aria-live="polite" aria-label={`${t.qty} ${qty}`}>{qty}</span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= 99}
        aria-label={`${t.add} ${label}`}
        className="h-full w-8 rounded-r-lg hover:bg-brand-800 disabled:opacity-50"
      >
        +
      </button>
    </div>
  )
}
