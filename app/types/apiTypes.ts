// getComics / getRileyComics
export interface ComicsResponse {
  comics: Record<number | string, string>; // e.g. { "1": "Page_001.jpg", ... }
  latest: number;
  chapters: number[];
}

// getSketches
export interface Sketch {
  src: string;
  date: number; // epoch timestamp
}
export type SketchesResponse = Sketch[];

export interface ComicManifest {
  generatedAt: string;
  comics: ComicsResponse;
  rileyComics: Record<string, ComicsResponse>;
  solipsus: ComicsResponse;
  sketches: SketchesResponse;
}
