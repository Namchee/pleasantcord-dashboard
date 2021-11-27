import { NextApiRequest, NextApiResponse } from 'next';

import { UnauthenticatedException } from '@/common/error';
import { getCurrentDiscordUser } from '@/pages/api/user';

async function getCategories(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const user = await getCurrentDiscordUser(req);

    const { id } = await user.json();

    const apiUrl = process.env.PC_API_URL;
    const apiKey = process.env.PC_API_KEY;

    if (!apiUrl || !apiKey) {
      throw new Error('Missing API data. Please check the config');
    }

    const response = await fetch(
      `${apiUrl}/categories`,
      {
        headers: {
          Authorization: `pleasantcord ${apiKey}/${id}`,
        },
      },
    );

    if (!response.ok) {
      return res.status(response.status).json({
        data: null,
        error: response.statusText,
      });
    }

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
