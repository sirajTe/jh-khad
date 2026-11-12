import { useEffect, useState } from 'react'
import { offerPrice } from './utils'

// Cart items are { id, pack, qty }. Prices are looked up from the current
// product list each time, so a price change in the sheet shows up in carts
// already saved.

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('cart'))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function useCart() {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch {
      // storage blocked — cart just won't survive a reload
    }
  }, [items])

  const add = (id, pack, qty) =>
    setItems((list) => {
      const found = list.find((i) => i.id === id && i.pack === pack)
      if (!found) return [...list, { id, pack, qty }]
      return list.map((i) => (i === found ? { ...i, qty: Math.min(99, i.qty + qty) } : i))
    })

  const setQty = (id, pack, qty) =>
    setItems((list) =>
      qty < 1 ? list.filter((i) => !(i.id === id && i.pack === pack)) : list.map((i) => (i.id === id && i.pack === pack ? { ...i, qty: Math.min(99, qty) } : i)),
    )

  const clear = () => setItems([])

  return { items, add, setQty, clear }
}

// Cart items joined with their product details. Items whose product was
// removed (or whose pack size no longer exists) are dropped.
export function cartLines(items, products) {
  return items.flatMap((i) => {
    const p = products.find((x) => x.id === i.id)
    const packIdx = p ? p.packs.indexOf(i.pack) : -1
    if (packIdx < 0) return []
    const mrp = p.prices?.[packIdx]
    const price = mrp != null ? offerPrice(mrp, p.offer) : null // null → price on request
    return [{ ...i, product: p, price, lineTotal: price == null ? null : price * i.qty }]
  })
}

export const cartCount = (items) => items.reduce((n, i) => n + i.qty, 0)

// e.g. JH-261009-4827
export function newOrderId() {
  const d = new Date()
  const ymd = [d.getFullYear() % 100, d.getMonth() + 1, d.getDate()].map((n) => String(n).padStart(2, '0')).join('')
  return `JH-${ymd}-${Math.floor(1000 + Math.random() * 9000)}`
}
