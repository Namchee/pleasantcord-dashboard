import { NextApiRequest, NextApiResponse } from 'next';

import { getToken } from 'next-auth/jwt';

import { API_URL } from '@/constant/api';
import { DISCORD_NOT_AUTH, REFRESH_ERROR } from '@/constant/error';

async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET as string,
  });

  const accessToken = token?.accessToken;

  if (!token || !accessToken) {
    return res.status(401).json({
      data: null,
      error: 'User is not authenticated',
    });
  }

  const response = await fetch(
    `${API_URL}/users/@me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({
      data: null,
      error: result.message === DISCORD_NOT_AUTH ?
        REFRESH_ERROR :
        result.message,
    });
  }

  return res.status(200).json({
    data: result,
    error: null,
  });
}

export default getCurrentUser;
