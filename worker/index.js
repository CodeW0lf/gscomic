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

async function listAll(bucket, prefix) {
  const objects = [];
  let cursor;

  do {
    const page = await bucket.list({ prefix, cursor });
    objects.push(...page.objects);
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);

  return objects;
}

async function buildComicCollection(bucket, name) {
  const collection = collections[name];
  const objects = await listAll(bucket, collection.prefix);
  const comics = {};
  let latest = 1;

  for (const object of objects) {
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

  return name === 'rileyComics' ? comics : { comics, latest, chapters: collection.chapters };
}

async function buildManifest(bucket) {
  const [comics, rileyComics, solipsus, sketchObjects] = await Promise.all([
    buildComicCollection(bucket, 'comics'),
    buildComicCollection(bucket, 'rileyComics'),
    buildComicCollection(bucket, 'solipsus'),
    listAll(bucket, 'sketch_files/'),
  ]);

  const sketches = sketchObjects
    .map((object) => {
      const src = object.key.slice('sketch_files/'.length);
      return { src, date: historicalSketchDates.get(src) ?? Math.floor(object.uploaded.getTime() / 1000) };
    })
    .filter((sketch) => sketch.src && !sketch.src.startsWith('.'))
    .sort((a, b) => b.date - a.date);

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
