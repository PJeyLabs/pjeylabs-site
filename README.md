# pjeylabs-site

## PJey Labs Site

The homepage includes separate **Products** and **App Hub** pages with:

- A **Products** page for product overview cards
- An **App Hub** page for responsive download cards
- Clean routes for `/products`, `/app-hub`, and `/about`
- Reusable frontend pieces: `AppCard`, `ProductsSection`, `AppHubSection`, and `FirebaseAppsService`

## Firebase setup

`index.html` already contains a reusable Hub data path.

- Update `FIREBASE_CONFIG` in `index.html` with your real PJey Labs Firebase credentials.
- If needed, adjust `APP_COLLECTION_NAME` to match the public collection used by PJ Notes / Hub Admin. The current collection is `public_apps`.
- No temporary sample apps are shown; the UI only renders apps loaded from the Hub.

## Privacy and optional scripts

The shared consent controller is loaded from `assets/js/cookie-consent.js`. Analytics,
marketing, or optional functional scripts must not be added as ordinary executable
scripts. Keep them blocked until consent by using `type="text/plain"` and a
`data-cookie-category="analytics"`, `functional`, or `marketing` attribute. Use
`data-src` instead of `src` for a blocked external script.

If the purposes, providers, or scripts change, update the Privacy Policy and Cookie
Policy and increment `CONSENT_VERSION` so visitors are asked for a fresh choice.
