# Idea Kitchen

An installable web-app prototype for turning everyday ideas into products.

## Included
- Friendly “describe it and make it for me” workflow
- Four alternatives for every product idea
- Clear assignment of AI, designers, engineers, makers, testers, production, fulfillment, and shipping
- Public idea upgrades with voting and creator approval
- Marketplace for finished goods, made-to-order products, digital plans, apps, and services
- Pinterest-style visual discovery and boards
- Etsy-style independent maker stores, custom orders, reviews, local pickup, and shipping concepts
- Franchise models: home studio, creator storefront, and regional production hub
- Desktop and mobile toolbars
- Offline-capable PWA shell

## Run locally
Open `index.html` directly, or serve the folder with:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Production integrations still required
A live commercial version needs authentication, a database, file storage, AI APIs, Stripe Connect or another marketplace-payment system, shipping APIs, tax calculation, messaging, moderation, identity and maker verification, contracts, privacy/security controls, and legal review. Franchise sales require franchise counsel and required disclosure/compliance work.


## Added creator business studio
- Highly customizable app builder with clickable concepts and AI example generation
- Private creator diary saved locally
- AI-assisted business plan outline and launch checklist
- Purchasable backend workflow packages with swappable components
- Friendly card view and Excel-style workflow grid
- Budget builder for products, apps, marketplaces, services, and franchise concepts
- Startup, monthly, reserve, funding, gross-margin, and break-even estimates

## Compensation, contracts, and AI improvement update
- Configurable platform-owner fee and public-contributor pool
- Stripe Connect destination-charge starter with application fees
- Seller payout routing and minimum platform fee example
- Checkout contract-version metadata
- Webhook signature verification and paid-order fulfillment trigger
- Purchase-proof ledger with timestamp and SHA-256-style fingerprint
- Downloadable per-sale marketplace contract template
- Weekly, monthly, or quarterly AI-improvement review settings
- Human approval required by default before releasing AI-generated improvements

## Stripe launch setup
1. Create and verify a Stripe business account.
2. Enable Stripe Connect and choose the connected-account model appropriate for sellers.
3. Copy `.env.example` to `.env` and add test keys.
4. Run `npm install` and `npm start`.
5. Register `/webhook` as a Stripe webhook endpoint and add its signing secret.
6. Test connected seller onboarding, Checkout, application fees, refunds, disputes, taxes, and payouts before live mode.

The included agreement is a product-design template, not legal advice. Marketplace, consumer, privacy, IP, tax, product-safety, accessibility, and franchise counsel should review all live terms.

## Expanded category marketplaces and swaps
The marketplace now includes category-specific browsing and trade flows for tiny homes, boats, tents, portable living quarters, clothing, raw goods and materials, home goods, gardens, seeds, tools, kitchen goods, art and fine art, jewelry, music and instruments, makeup and beauty, literature, printable works, zines, journals, manuscripts, and handmade books.

The Will Swap system supports item-for-item swaps, service-for-goods exchanges, category wish lists, and cash-plus-trade offers. A live implementation should record condition, estimated value, inspection periods, shipping responsibility, insurance, cash adjustments, accepted contract version, and proof of both parties’ assent.

## Publish
This package is deployment-ready for a Node-capable host. Upload the project, set the environment variables from `.env.example`, run `npm install`, and start with `npm start`. Static-only hosts can publish `index.html`, `manifest.json`, and `sw.js`, but live Stripe checkout and webhooks require the Node server on a secure HTTPS URL.
