import { APIError } from '@/entity/error';

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const result = await response.json();

  if (!response.ok) {
    const err = new APIError(result.error, response.status);
    throw err;
  }

  return result;
};
