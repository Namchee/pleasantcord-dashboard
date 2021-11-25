import { UnauthenticatedException } from '@/common/error';
import { API_URL } from '@/constant/api';
import { NextApiRequest, NextApiResponse } from 'next';

import { getToken } from 'next-auth/jwt';

async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const response = await getCurrentDiscordUser(req);

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
  } catch (err) {
    const error = err as Error;
    const unauthenticated = error instanceof UnauthenticatedException;

    return res.status(unauthenticated ? 401 : 500).json({
      data: null,
      error: error.message,
    });
  }
}

export async function getCurrentDiscordUser(req: NextApiRequest) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_PRIVATE_KEY,
  });

  const accessToken = token?.accessToken;

  if (!token || !accessToken) {
    throw new UnauthenticatedException();
  }

  return fetch(
    `${API_URL}/users/@me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export default getCurrentUser;
