# MarketPay MVC Demo

A small, dependency-free Model-View-Controller storefront and checkout demo. New visitors enter an email address and phone number to sign in; those details are remembered in that browser so returning visitors skip the sign-in screen. The store has a five-slide hero carousel, search, 20 product categories with 10 products each, sale pricing, and a persistent multi-item cart. Apple products are searchable but are not shown in the regular category shelves. Prices for iPhone 12 64GB and iPhone 18 Pro Max storage options reflect Jumia Nigeria offers observed on 9 October 2026; each links to a fresh seller search because listing prices and stock change. Other Apple model prices are marked as estimates. Payment choices appear after visitors proceed from the cart. All payment methods show a verification spinner and a final confirmed or denied result. Bank transfer also has a separate authorization page with a generated, scannable QR code containing plain-text demo order reference, product ID, and amount, alongside a placeholder account number and 20-minute timer.

## Project structure

```text
.
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── app.js
    ├── controllers/
    │   └── transaction-controller.js
    ├── models/
    │   └── transaction-model.js
    ├── utils/
    │   └── qr-code.js
    └── views/
        └── transaction-view.js
```

- **Model** (`js/models/transaction-model.js`) owns the product catalog, cart, sign-in profile, cookie preference, transaction history, delivery details, and browser `localStorage`.
- **View** (`js/views/transaction-view.js`) renders sign-in, the cookie notice, searchable storefront, cart, payment choices, delivery form, transfer authorization page, history, and receipts. Header icons use Lucide SVGs served by Iconify, with inline SVG fallbacks.
- **Controller** (`js/controllers/transaction-controller.js`) connects UI actions to the model, manages cart and checkout flow, sign-in, and the transfer timer, and refreshes the view.
- **App entry point** (`js/app.js`) creates and connects the MVC pieces.
- **QR utility** (`js/utils/qr-code.js`) generates a scannable QR symbol locally from the demo order string.

## Run locally

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000> in a browser. ES modules require an HTTP server; opening the HTML directly as a `file://` URL will not work in many browsers.

The demo sign-in only stores an email and phone number locally; it does not verify identity or create a secure account. Sign-in details, cart, cookie preference, transaction history, delivery addresses, masked card labels, and appearance/currency preferences stay in this browser's `localStorage` and are not shared with a company server or other devices. The **Profile** page supports a local avatar, editable phone, saved addresses, masked card labels, a customer badge, and order tracking. The first-100 badge counts sign-ins only in this browser and is not a global customer ranking. Saved cards retain only brand and last four digits; full card numbers and security codes are never saved. The **Settings** page supports NGN, EUR, GBP, and USD using fixed illustrative offline exchange rates; transaction amounts remain stored in NGN. Appearance follows the device by default, with light/dark overrides and a home-page toggle. The tracking carousel shows estimated warehouse, airport, transit, and delivery milestones; it is simulated and does not receive live carrier scans. The cookie notice appears after sign-in until a preference is chosen; it offers **Accept** and **Essential only**. No analytics or advertising cookies are used. Product and hero photos, payment marks, and Lucide icons are loaded from external image hosts and need an internet connection; header icons have inline fallbacks. Each catalog product has a distinct, product-matched Unsplash image in `js/data/product-images.js`. Adding an item animates its product image lifting and flying into the cart; users with reduced motion enabled skip the flight. Jumia prices are individual marketplace offers, not Apple pricing, and should be checked for seller, condition, and stock before purchase. The generated QR is a real, scannable QR symbol for plain-text demo order information only; it does not initiate or authorize a payment. The bank account is a placeholder, the transfer confirmation button simulates success, and no bank is contacted. Card field values are not transmitted or stored, and PayPal/Apple Pay do not connect to their providers. Transaction history is only shown after opening **Transaction history**; open a transaction's receipt from that history page.
