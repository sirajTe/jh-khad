// =====================================================================
//  POLICY PAGES — Terms, Privacy, Refund & Cancellation, Shipping.
//  Razorpay checks these pages before activating your account.
//  Read them once and change anything that does not match how your
//  shop actually works (refund days, delivery area, etc.).
// =====================================================================
import { SHOP } from './config'

export const LAST_UPDATED = '9 October 2026'

const contactLines = [
  `${SHOP.name}`,
  `Address: ${SHOP.address}`,
  `Phone / WhatsApp: ${SHOP.phoneDisplay}`,
  `Email: ${SHOP.email}`,
]

// Each section has a heading (h) and either paragraphs (p) or a list.
export const POLICIES = [
  {
    path: '/terms',
    title: { en: 'Terms & Conditions', hi: 'नियम और शर्तें' },
    sections: [
      {
        p: [
          `This website is run by ${SHOP.name}, ${SHOP.address} ("we", "us", "our"). By using this website or placing an order or enquiry with us, you agree to these terms.`,
        ],
      },
      {
        h: 'Our products',
        p: [
          'We sell agricultural inputs: micronutrient fertilizers, pesticides and seeds. Product photos on this website are for illustration only; the actual pack, brand label and colour may differ.',
          'Prices are shown as "Price on Request". The final price, pack size and availability are confirmed by us on phone or WhatsApp before you pay.',
        ],
      },
      {
        h: 'Orders',
        p: [
          'An enquiry or "Order Now" request on this website is not a confirmed order. An order is confirmed only after we accept it on phone or WhatsApp and payment is received (or cash payment is agreed at pickup).',
          'We may refuse or cancel an order if a product is out of stock, the price was quoted wrongly, or the product cannot legally be sold to the buyer. If you have already paid, we will refund you in full.',
        ],
      },
      {
        h: 'Payments',
        p: [
          'You can pay at our shop by cash or UPI, or online through a secure payment link. Online payments are processed by our payment partner (Razorpay). We never see or store your card, UPI PIN or net-banking password.',
        ],
      },
      {
        h: 'Safe use of pesticides and fertilizers',
        p: [
          'Always read and follow the label and leaflet supplied with the product. Use the recommended dose, wear protective clothing, and keep products away from children, food and animals.',
          'Crop advice from our shop is given in good faith based on the information you share. Results depend on weather, soil, timing and correct use, so we cannot guarantee a particular yield.',
        ],
      },
      {
        h: 'Liability',
        p: [
          'Our responsibility for any product is limited to the price you paid for that product. We are not responsible for loss caused by wrong dose, wrong method of use, or not following label instructions.',
        ],
      },
      {
        h: 'Governing law',
        p: ['These terms are governed by the laws of India. Any dispute is subject to the courts of Katihar, Bihar.'],
      },
      {
        h: 'Changes',
        p: ['We may update these terms from time to time. The latest version will always be on this page.'],
      },
    ],
  },
  {
    path: '/privacy',
    title: { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
    sections: [
      {
        p: [`${SHOP.name} respects your privacy. This policy explains what information we collect through this website and how we use it.`],
      },
      {
        h: 'Information we collect',
        list: [
          'Details you type into our enquiry / order form: name, mobile number, village, product, quantity and message.',
          'Messages and call details when you contact us by phone or WhatsApp.',
          'Payment details such as amount and payment status when you pay online. Card, UPI and bank details are handled only by our payment partner (Razorpay), not by us.',
          'Your language choice (English / Hindi), saved only in your own browser.',
        ],
      },
      {
        h: 'How we use it',
        list: [
          'To call or message you about your enquiry or order.',
          'To arrange pickup or delivery and to give crop advice you ask for.',
          'To keep simple business records of orders and payments.',
        ],
      },
      {
        h: 'Where it is stored',
        p: [
          'Enquiries are stored in a private Google Sheet that only our shop can access. We do not sell, rent or share your personal information with anyone for marketing.',
          'We share information only when needed to complete your order (for example with the payment partner) or when required by law.',
        ],
      },
      {
        h: 'Other services on this website',
        p: [
          'This website shows a Google Map and photos loaded from other websites, and links to WhatsApp. These services may collect basic technical data (like your IP address) under their own privacy policies.',
        ],
      },
      {
        h: 'Your choices',
        p: ['You can ask us at any time to see, correct or delete the information we hold about you. Contact us using the details below.'],
      },
    ],
  },
  {
    path: '/refund',
    title: { en: 'Refund & Cancellation Policy', hi: 'रिफंड और रद्दीकरण नीति' },
    sections: [
      {
        h: 'Cancelling an order',
        p: [
          'You can cancel an order free of charge any time before it is picked up from the shop or sent for delivery. Call or WhatsApp us to cancel. If you have already paid, you will receive a full refund.',
          'Once an order has been picked up or delivered, it cannot be cancelled, but the return rules below apply.',
        ],
      },
      {
        h: 'Returns and replacements',
        list: [
          'Wrong product, damaged pack, leaking bottle or expired product: tell us within 48 hours of pickup or delivery, with a photo if possible. We will replace the product or give a full refund.',
          'Unopened products in their original sealed pack may be returned within 7 days for a refund, as long as they have been stored properly.',
          'For safety and quality reasons, we cannot take back seeds, pesticides or fertilizers once the pack is opened or the seal is broken, unless the product was faulty.',
        ],
      },
      {
        h: 'How refunds are paid',
        list: [
          'Online payments are refunded to the same account, card or UPI ID used for payment, within 5–7 working days after we approve the refund. Your bank may take a few extra days to show it.',
          'Cash payments are refunded in cash or by UPI at our shop.',
        ],
      },
      {
        h: 'Need help?',
        p: ['Contact us with your name, mobile number and order details, and we will sort it out quickly.'],
      },
    ],
  },
  {
    path: '/shipping',
    title: { en: 'Shipping & Delivery Policy', hi: 'शिपिंग और डिलीवरी नीति' },
    sections: [
      {
        h: 'Shop pickup',
        p: [
          'Most orders are collected from our shop. We will tell you on phone or WhatsApp when your order is ready, usually the same day or next working day.',
        ],
      },
      {
        h: 'Local delivery',
        p: [
          'We can arrange delivery to villages in and around Barsoi and Katihar district, and to nearby areas of Purnia, Kishanganj and Araria where possible.',
          'Delivery charges (if any) and the expected delivery date are told to you before you pay. Local delivery usually takes 1–3 working days after the order is confirmed.',
          'Delivery may be delayed by heavy rain, floods, festivals or other reasons outside our control. We will keep you informed.',
        ],
      },
      {
        h: 'Delivery area',
        p: ['We do not currently ship by courier outside Bihar. Please contact us if you are outside our delivery area.'],
      },
      {
        h: 'On receiving your order',
        p: [
          'Please check the products when you receive them. If anything is missing, damaged or wrong, tell us within 48 hours — see our Refund & Cancellation Policy.',
        ],
      },
    ],
  },
]

export const CONTACT_LINES = contactLines

export function findPolicy(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return POLICIES.find((p) => p.path === path)
}
