export const formatRupees = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

// Price after the product's % offer, rounded to the nearest rupee
export const offerPrice = (mrp, offer) => Math.round(mrp * (1 - (offer || 0) / 100))
