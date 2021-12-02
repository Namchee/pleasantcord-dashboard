import { NextApiRequest, NextApiResponse } from 'next';

import { UnauthenticatedException } from '@/common/error';
import { getCurrentDiscordUser } from '@/pages/api/user';

export async function updateServerConfig(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method?.toUpperCase() !== 'PATCH') {
    return res.status(405).json({
      data: null,
      error: 'Method not allowed',
    });
  }

  try {
    const user = await getCurrentDiscordUser(req);

    const { id } = await user.json();

    const apiUrl = process.env.PC_API_URL;
    const apiKey = process.env.PC_API_KEY;

    if (!apiUrl || !apiKey) {
      throw new Error('Missing API data. Please check the config');
    }

    const response = await fetch(
      `${apiUrl}/config`,
      {
        headers: {
          Authorization: `pleasantcord ${apiKey}/${id}`,
        },
        method: 'PATCH',
        body: req.body,
      },
    );

    if (!response.ok) {
      return res.status(response.status).json({
        data: null,
        error: response.statusText,
      });
    }

    return res.status(200).json({
      data: 'ok',
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


export default updateServerConfig;
