import { NextApiRequest, NextApiResponse } from 'next';

import { getToken } from 'next-auth/jwt';

export async function getServerConfig(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET as string,
  });

  if (!token || !token.userId) {
    return res.status(401).json({
      data: null,
      error: 'User is not authenticated',
    });
  }

  const apiUrl = process.env.PC_API_URL;
  const apiKey = process.env.PC_API_KEY;

  if (!apiUrl || !apiKey) {
    return res.status(500).json({
      data: null,
      error: 'Missing API data. Please check the config',
    });
  }

  const serverId = req.query['id'];

  if (!serverId || Number.isNaN(serverId)) {
    return res.status(500).json({
      data: null,
      error: 'Server ID is required and must be an integer',
    });
  }

  const response = await fetch(
    `${apiUrl}/config/${serverId}`,
    {
      headers: {
        Authorization: `pleasantcord ${apiKey}/${token.userId}`,
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
}

export default getServerConfig;
