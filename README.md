# JH KHAD BHANDAR — Product Catalogue Website

Simple, fast, mobile-friendly catalogue for the shop. No cart or payment —
customers contact you by **Call**, **WhatsApp** or the **Enquiry form**.

Built with React + JavaScript + Tailwind CSS (Vite).

## Run it on your computer

1. Install Node.js 20 or newer from https://nodejs.org
2. In this folder run:

   ```bash
   npm install
   npm run dev
   ```

3. Open the link it shows (usually http://localhost:5173).

## Edit products, photos and shop details

Everything you normally change is in **one file: `src/config.js`**

- `GOOGLE_SCRIPT_URL` — link for the enquiry form (see below)
- `SHOP` — phone, WhatsApp, email, address
- `IMAGES` — all photo links (hero, categories, products, gallery)
- `PRODUCTS` — the product list. Copy one `{ ... }` block to add a product.
  `category` must be `'fertilizer'`, `'pesticide'` or `'seed'`.

To use your own photos: put them in the `public` folder (e.g. `public/zinc.jpg`)
and write `'/zinc.jpg'` in `config.js`. Keep photos small (under ~150 KB,
about 800 px wide) so the site loads fast on village internet.

All website text (English and Hindi) is in `src/i18n.js`.

## Connect the enquiry form to Google Sheets

1. Go to https://sheets.google.com and create a new blank sheet,
   e.g. "JH Enquiries".
2. In the sheet click **Extensions → Apps Script**.
3. Delete the code you see, and paste everything from
   `google-apps-script/Code.gs`. Click **Save** (💾).
4. Click **Deploy → New deployment**.
   - Click the ⚙️ next to "Select type" → choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**.
5. Google will ask for permission → **Authorize access** → choose your account
   → **Advanced** → **Go to (project name) (unsafe)** → **Allow**.
   (This is normal for your own scripts.)
6. Copy the **Web app URL** (ends with `/exec`).
7. Open `src/config.js` and replace `'GOOGLE_SCRIPT_URL'` with that link:

   ```js
   export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/XXXX/exec'
   ```

8. Submit a test enquiry on the website. A new row appears in the
   **Enquiries** tab of your sheet, and you get an email at jh749910@gmail.com.
   (To stop emails, set `NOTIFY_EMAIL = ''` in the script.)

**If you change the script later:** Deploy → Manage deployments → ✏️ Edit →
Version: **New version** → Deploy. The URL stays the same.

Until the URL is set, the form shows "not connected yet — please call or
WhatsApp us" so no enquiry is silently lost.

## Put the website online (free)

```bash
npm run build
```

This creates a `dist` folder. Upload it to any free host:

- **Netlify**: go to https://app.netlify.com/drop and drag the `dist` folder in.
- **Vercel** or **GitHub Pages** also work.
