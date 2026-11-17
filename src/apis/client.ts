import axios from 'axios';

export const MOCK_MEMBER_ID = '1';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
