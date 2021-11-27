import { UnauthenticatedException } from '@/common/error';
import { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentDiscordUser } from '../user';

export async function getServerConfig(
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

    const serverId = req.query['id'];

    if (!serverId) {
      throw new Error('Server ID is required');
    }

    const response = await fetch(
      `${apiUrl}/config/${serverId}`,
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


export default getServerConfig;
