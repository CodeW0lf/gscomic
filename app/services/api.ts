import axios from 'axios';

const baseURL = import.meta.env.DEV ? 'http://localhost:8088/' : '/api/';

export const api = axios.create({ baseURL });
