import sketchDates from './sketch-dates.json' with { type: 'json' };

const MANIFEST_KEY = 'manifest.json';
const historicalSketchDates = new Map(sketchDates.map(({ src, date }) => [src, date]));

const collections = {
  comics: {
    prefix: 'comics/',
    filenamePattern: /^Page_0*(\d+)\.(?:jpg|png)$/i,
    chapters: [0, 18, 39, 56, 72, 88, 98, 120, 141, 166, 182, 201, 217, 236],
  },
  rileyComics: {
    prefix: 'riley_comics/',
    filenamePattern: /^Page_0*(\d+)([ab])\.(?:jpg|png)$/i,
    chapters: [],
  },
  solipsus: {
    prefix: 'solipsus/',
    filenamePattern: /^Page_0*(\d+)\.(?:jpg|png)$/i,
    chapters: [0],
  },
};

async function buildComicCollection(bucket, name) {
  const collection = collections[name];
  const comics = {};
  let latest = 1;
  let cursor;

  do {
    const page = await bucket.list({ prefix: collection.prefix, cursor });

    for (const object of page.objects) {
      const filename = object.key.slice(collection.prefix.length);
      const matches = filename.match(collection.filenamePattern);
      if (!matches) continue;

      const comicNumber = Number(matches[1]);
      const version = matches[2]?.toLowerCase();

      if (name === 'rileyComics') {
        if (!comics[version]) comics[version] = { comics: {}, latest: 1, chapters: collection.chapters };
        comics[version].comics[comicNumber] = filename;
        comics[version].latest = Math.max(comics[version].latest, comicNumber);
      } else {
        comics[comicNumber] = filename;
        latest = Math.max(latest, comicNumber);
      }
    }

    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);

  return name === 'rileyComics' ? comics : { comics, latest, chapters: collection.chapters };
}

async function listSketches(bucket) {
  const prefix = 'sketch_files/';
  const sketches = [];
  let cursor;

  do {
    const page = await bucket.list({ prefix, cursor });

    for (const object of page.objects) {
      const src = object.key.slice(prefix.length);
      if (!src || src.startsWith('.')) continue;
      sketches.push({ src, date: historicalSketchDates.get(src) ?? Math.floor(object.uploaded.getTime() / 1000) });
    }

    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);

  return sketches;
}

async function buildManifest(bucket) {
  const [comics, rileyComics, solipsus, sketches] = await Promise.all([
    buildComicCollection(bucket, 'comics'),
    buildComicCollection(bucket, 'rileyComics'),
    buildComicCollection(bucket, 'solipsus'),
    listSketches(bucket),
  ]);

  sketches.sort((a, b) => b.date - a.date);

  return { generatedAt: new Date().toISOString(), comics, rileyComics, solipsus, sketches };
}

export async function refreshManifest(bucket) {
  const manifest = await buildManifest(bucket);
  await bucket.put(MANIFEST_KEY, JSON.stringify(manifest), {
    httpMetadata: {
      contentType: 'application/json; charset=utf-8',
      cacheControl: 'public, max-age=300',
    },
  });
  return manifest;
}

export default {
  fetch() {
    return new Response('Not found', { status: 404 });
  },

  async scheduled(_controller, env) {
    await refreshManifest(env.GSCOMIC_BUCKET);
  },
};
