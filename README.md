# JH AGRO AGENCY — Product Catalogue Website

Simple, fast, mobile-friendly catalogue for the shop. Customers can add
products to a cart and order, or contact you by **Call**, **WhatsApp** or the
**Enquiry form**.

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

Products are changed in the **Google Sheet** (see below). Shop details and
photos are in **one file: `src/config.js`**

- `GOOGLE_SCRIPT_URL` — link for the enquiry form (see below)
- `SHOP` — phone, WhatsApp, email, address
- `IMAGES` — all photo links (hero, categories, products, gallery)
- `PRODUCTS` — the **backup** product list, shown only until the Google Sheet
  loads (or if it can't be reached). Day-to-day product changes are made in
  the sheet — see "Change products from the Google Sheet" below.

To use your own photos: put them in the `public` folder (e.g. `public/zinc.jpg`)
and write `'/zinc.jpg'` in `config.js`. Keep photos small (under ~150 KB,
about 800 px wide) so the site loads fast on village internet.

All website text (English and Hindi) is in `src/i18n.js`.

## Connect the enquiry form to Google Sheets

1. Open the **JH** Google Sheet (ID `1YdJglOuZiBYhmKsZPqL_Y4aRA11hRK5NQ79IK406cqw`).
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
   **JH** tab of the sheet, and an email goes to sirajul.mondal.tech@gmail.com.
   (Change `NOTIFY_EMAIL` in the script to send alerts elsewhere, or `''` to stop them.)

**If you change the script later:** Deploy → Manage deployments → ✏️ Edit →
Version: **New version** → Deploy. The URL stays the same.

Until the URL is set, the form shows "not connected yet — please call or
WhatsApp us" so no enquiry is silently lost.

## Change products from the Google Sheet (no code needed)

The website reads its products from the **Products** tab of the JH sheet.
Change a price, offer or product there and the website updates within about
a minute — no need to publish the website again.

### One-time setup

1. Connect the sheet first (steps above). If the script was already deployed
   before, paste the new `Code.gs` and deploy a **New version** (see
   "If you change the script later").
2. In the JH sheet, add a new tab named exactly **Products**.
3. In that tab: **File → Import → Upload** → choose
   `google-apps-script/products.csv` → Import location: **Replace current
   sheet** → **Import data**. This fills in all current products.
4. Open the Web app URL with `?action=products` at the end in your browser —
   you should see the product list.

(To make a fresh CSV from `src/config.js`, run `npm run products:csv`.)

### Columns

| Column | What to write | Example |
|---|---|---|
| `id` | Short unique code, never change it once used (carts use it). Blank = made from the name | `maize-seeds` |
| `category` | `fertilizer`, `pesticide` or `seed` | `seed` |
| `name_en` / `name_hi` | Product name in English / Hindi | `Hybrid Maize Seeds` |
| `use_en` / `use_hi` | One line about what it is for | `High-yield hybrid for maize` |
| `packs` | Pack sizes, separated by commas | `1 kg, 4 kg, 5 kg` |
| `prices` | MRP in ₹ for each pack, **same order and count** as packs. Leave blank for "Price on Request" | `350, 1300, 1600` |
| `offer` | % discount (blank or 0 = no offer) | `10` |
| `image` | Photo link. Blank = category photo. Google Drive photos must be shared as "Anyone with the link" | `https://...` |
| `active` | `no` to hide the product, otherwise leave `yes` or blank | `yes` |

Good to know:

- Don't put commas inside numbers in `prices` — write `1350`, not `1,350`.
- If the number of prices doesn't match the number of packs, that product
  shows "Price on Request" instead of a wrong price.
- A row with a missing name, pack or a wrong category is skipped; the rest
  of the products still show.
- Rows show on the website in the same order as in the sheet.

## Put the website online (free)

```bash
npm run build
```

This creates a `dist` folder. Upload it to any free host:

- **Netlify**: go to https://app.netlify.com/drop and drag the `dist` folder in.
- **Vercel** or **GitHub Pages** also work.
