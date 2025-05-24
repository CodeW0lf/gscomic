import { api } from './api';
import type { BadgesResponse, ComicsResponse, SketchesResponse } from '~/types/apiTypes';
import type { CharacterList } from '~/types/characterTypes';
import type { RileyComicVersion } from '~/types/comicTypes';

export const getComics = async (): Promise<ComicsResponse> => {
  const res = await api.get<ComicsResponse>('/get-comics.php');
  return res.data;
};

export const getRileyComics = async (version: RileyComicVersion): Promise<ComicsResponse> => {
  const res = await api.get<ComicsResponse>(`/get-riley-comics.php?version=${version}`);
  return res.data;
};

export const getSolipsusComics = async (): Promise<ComicsResponse> => {
  const res = await api.get<ComicsResponse>('/get-solipsus-comics.php');
  return res.data;
};

export const getSketches = async (): Promise<SketchesResponse> => {
  const res = await api.get<SketchesResponse>('/get-sketches.php');
  return res.data;
};

export const getBadges = async (): Promise<BadgesResponse> => {
  const res = await api.get<BadgesResponse>('/get-badges.php');
  return res.data;
};

export const getCharacters = async (): Promise<CharacterList> => {
  const response = await fetch('/characters-data/characterList.json');
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};
