import { NextApiRequest, NextApiResponse } from 'next';

import { getToken } from 'next-auth/jwt';

async function getContentTypes(
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
    throw new Error('Missing API data. Please check the config');
  }

  const response = await fetch(
    `${apiUrl}/contents`,
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

export default getContentTypes;
