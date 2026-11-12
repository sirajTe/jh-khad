export const formatRupees = (n: number): string =>
  '₹' + Math.round(n).toLocaleString('en-IN')

// Price after the product's % offer, rounded to the nearest rupee
export const offerPrice = (mrp: number, offer = 0): number =>
  Math.round(mrp * (1 - (offer || 0) / 100))
