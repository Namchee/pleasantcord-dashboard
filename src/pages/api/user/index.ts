import { NextApiRequest, NextApiResponse } from 'next';

import { getToken } from 'next-auth/jwt';

import { API_URL } from '@/constant/api';

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

  if (!response.ok) {
    return res.status(response.status).json({
      data: null,
      error: response.statusText,
    });
  }

  const result = await response.json();

  return res.status(200).json({
    data: result,
    error: null,
  });
}

export default getCurrentUser;
