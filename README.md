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
