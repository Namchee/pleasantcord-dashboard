import { API_URL } from '@/constant/api';
import { NextApiRequest, NextApiResponse } from 'next';

import { getToken } from 'next-auth/jwt';

async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_PRIVATE_KEY,
  });

  const accessToken = token?.accessToken;

  if (!token || !accessToken) {
    return res.status(401).json({
      data: null,
      error: 'User is not authenticated',
    });
  }

  const result = await fetch(
    `${API_URL}/users/@me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const json = await result.json();

  return res.status(result.ok ? 200 : 500).json({
    data: result.ok ? json : null,
    error: result.ok ? null : result.statusText,
  });
}

export default getCurrentUser;
