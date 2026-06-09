# pjeylabs-site

## PJey Labs Apps Hub

The homepage now includes a new **Apps Hub** section under the main tab (`Products / Apps Hub`) with:

- A homepage preview card section titled **PJey Labs Apps**
- A full **All PJey Labs Apps** page with responsive cards
- Reusable frontend pieces: `AppCard`, `AppHubSection`, and `FirebaseAppsService`

## Firebase setup

`index.html` already contains a reusable Hub data path.

- Update `FIREBASE_CONFIG` in `index.html` with your real PJey Labs Firebase credentials.
- If needed, adjust `APP_COLLECTION_CANDIDATES` order to match the collection name used by PJ Notes / Hub Admin (`apps`, `hub_apps`, `products`, `pjeylabs_apps`, `public_apps`).
- No temporary sample apps are shown; the UI only renders apps loaded from the Hub.
