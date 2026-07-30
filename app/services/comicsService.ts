import { api, manifestURL, usesManifest } from './api';
import type { ComicManifest, ComicsResponse, SketchesResponse } from '~/types/apiTypes';
import type { CharacterList } from '~/types/characterTypes';
import type { RileyComicVersion } from '~/types/comicTypes';

let manifestRequest: Promise<ComicManifest> | undefined;

const getManifest = async (): Promise<ComicManifest> => {
  if (!manifestURL) throw new Error('VITE_MANIFEST_URL is required to use the R2 catalog');
  manifestRequest ??= fetch(manifestURL).then(async (response) => {
    if (!response.ok) throw new Error(`Failed to fetch comic manifest: ${response.status}`);
    return response.json() as Promise<ComicManifest>;
  });
  return manifestRequest;
};

export const getComics = async (): Promise<ComicsResponse> => {
  if (usesManifest) return (await getManifest()).comics;

  const res = await api.get<ComicsResponse>('/get-comics.php');
  return res.data;
};

export const getRileyComics = async (version: RileyComicVersion): Promise<ComicsResponse> => {
  if (usesManifest) return (await getManifest()).rileyComics[version] ?? { comics: {}, latest: 1, chapters: [] };

  const res = await api.get<ComicsResponse>(`/get-riley-comics.php?version=${version}`);
  return res.data;
};

export const getSolipsusComics = async (): Promise<ComicsResponse> => {
  if (usesManifest) return (await getManifest()).solipsus;

  const res = await api.get<ComicsResponse>('/get-solipsus-comics.php');
  return res.data;
};

export const getSketches = async (): Promise<SketchesResponse> => {
  if (usesManifest) return (await getManifest()).sketches;

  const res = await api.get<SketchesResponse>('/get-sketches.php');
  return res.data;
};

export const getCharacters = async (): Promise<CharacterList> => {
  const response = await fetch('/characters-data/characterList.json');
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};
