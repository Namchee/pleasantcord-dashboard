import { UnauthenticatedException } from '@/common/error';
import { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentDiscordUser } from '../user';

async function getCategories(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const userId = getCurrentDiscordUser(req);

    const apiUrl = process.env.API_URL;
    const apiKey = process.env.API_KEY;

    if (!apiUrl || !apiKey) {
      throw new Error('Missing API data. Please check the config');
    }

    const response = await fetch(
      `$${apiUrl}/categories`,
      {
        headers: {
          Authorization: `pleasantcord ${apiKey}/${userId}`,
        },
      },
    );

    const { data } = await response.json();

    return res.status(200).json({
      data,
      error: null,
    });
  } catch (err) {
    const error = err as Error;
    const isUnauthenticated = error instanceof UnauthenticatedException;

    return res.status(isUnauthenticated ? 401 : 500).json({
      data: null,
      error: error.message,
    });
  }
}

export default getCategories;
