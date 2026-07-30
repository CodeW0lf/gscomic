import axios from 'axios';

const legacyBaseURL = import.meta.env.DEV ? 'http://localhost:8088/' : '/api/';

export const mediaBaseURL = (import.meta.env.VITE_MEDIA_BASE_URL ?? '/img').replace(/\/$/, '');

export const manifestURL = import.meta.env.VITE_MANIFEST_URL;

export const usesManifest = Boolean(manifestURL);

export const mediaUrl = (path: string) => `${mediaBaseURL}/${path.replace(/^\//, '')}`;

export const api = axios.create({ baseURL: legacyBaseURL });
