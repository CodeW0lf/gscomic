# God Slayers Comic

https://www.godslayerscomic.com

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Cloudflare Workers + R2

The static site is deployed as a Cloudflare Workers static-assets project. Comic
images, sketches, and `manifest.json` are served from the `gscomic` R2 bucket
through `https://img.godslayerscomic.com`. Copy `.env.example` to `.env` before
building so the browser fetches the manifest and media from that domain.

The scheduled R2 manifest generator and its deployment instructions live in
[`worker/`](worker/README.md). It regenerates `manifest.json` hourly from the
existing object paths; there is no request-time catalog API.

Deploy the site with `npm run site:deploy`. In the Cloudflare build settings,
set `VITE_MEDIA_BASE_URL` and `VITE_MANIFEST_URL` from `.env.example`; Vite
embeds these public values at build time.

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```
