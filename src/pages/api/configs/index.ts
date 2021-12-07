import { NextApiRequest, NextApiResponse } from 'next';

import { getToken } from 'next-auth/jwt';

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

  const response = await fetch(
    `${apiUrl}/config`,
    {
      headers: {
        Authorization: `pleasantcord ${apiKey}/${token.userId}`,
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
}

export default updateServerConfig;
