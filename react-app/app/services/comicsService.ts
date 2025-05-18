import { api } from './api';
import type { BadgesResponse, ComicsResponse, SketchesResponse } from '~/types/apiTypes';

export const getComics = async (): Promise<ComicsResponse> => {
  const res = await api.get<ComicsResponse>('/get-comics.php');
  return res.data;
};

export const getRileyComics = async (version: string): Promise<ComicsResponse> => {
  const res = await api.get<ComicsResponse>(`/get-riley-comics.php?version=${version}`);
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
