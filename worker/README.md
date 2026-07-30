# R2 manifest Worker

This Worker reads the `gscomic` R2 bucket and writes the catalog to
`manifest.json` at its root. It has no public fetch handler: the R2 custom
domain serves both the images and manifest directly.

The scheduled handler runs hourly. It keeps the existing release schedule from
the former catalog service, so future-dated comic files are not published
early. Update `collections.comics.latest` and `releaseTime` in `index.js` when
the release cadence changes.

`sketch-dates.json` is an export of the legacy sketch API made before the R2
migration. It preserves historical sketch publication dates, since an R2
object's upload timestamp cannot be backdated. A sketch not in that file uses
its R2 upload timestamp, which is correct for new sketches published after the
migration.

Hourly generation is only about 720 Worker invocations and roughly 3,600 R2
list/write operations per month (before pagination), so it fits comfortably in
the current free operation allowances. R2 is not universally free, however:
its Standard free tier includes 10 GB-month of storage, 1 million Class A, and
10 million Class B operations per month. Confirm that the comic library fits
within the storage allowance or add billing before migrating it.

## Deploy

Authenticate Wrangler, create the bucket if it does not already exist, then
deploy the Worker:

```bash
npx wrangler login
npx wrangler r2 bucket create gscomic
npm run worker:deploy
```

Run the initial generation immediately; do not wait for the first cron tick.
Start local development in one terminal:

```bash
npm run worker:dev
```

Then trigger the scheduled handler from a second terminal:

```bash
curl -i 'http://127.0.0.1:8787/__scheduled'
```

The Worker executes locally, but its R2 binding is configured with
`remote: true`, so this writes `manifest.json` to the real `gscomic` bucket.
The Worker exports a 404-only `fetch()` handler solely because Wrangler's
scheduled-event test endpoint requires one; `workers_dev` is disabled in the
deployment configuration.

## Publish the bucket

In R2, open `gscomic` > **Settings** > **Custom Domains** and connect
`img.godslayerscomic.com`. Do not use the `r2.dev` URL for production. Add an
R2 CORS policy allowing `GET` and `HEAD` from the website origins (including
your local development origin), because the app fetches `manifest.json` from
the image hostname. For example:

```json
[
  {
    "AllowedOrigins": ["https://godslayerscomic.com", "https://www.godslayerscomic.com", "http://localhost:5173"],
    "AllowedMethods": ["GET", "HEAD"]
  }
]
```

Create a Cloudflare Cache Rule for `img.godslayerscomic.com` that caches all
content. The Worker sets a five-minute browser/CDN freshness target for the
manifest; image objects can use a much longer TTL.
