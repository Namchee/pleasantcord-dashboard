import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { ADMIN_FLAG, API_URL } from '@/constant/api';
import { PartialServer } from '@/entity/server';
import { DISCORD_NOT_AUTH, REFRESH_ERROR } from '@/constant/error';

async function getServers(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
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

    const apiUrl = process.env.PC_API_URL;
    const apiKey = process.env.PC_API_KEY;

    if (!apiUrl || !apiKey) {
      return res.status(500).json({
        data: null,
        error: 'Missing API data. Please check the config',
      });
    }

    const result = await Promise.all([
      fetchAdminUserServer(accessToken),
      fetchConfiguredServers(apiKey, token.userId as string),
    ]);

    const servers = result[0].filter(({ id }) => {
      return result[1].includes(Number(id));
    });

    return res.status(200).json({
      data: servers,
      error: null,
    });
  } catch (err) {
    const { message } = err as Error;
    const isExpired = message === DISCORD_NOT_AUTH;

    return res.status(isExpired ? 401 : 500).json({
      data: null,
      error: isExpired ? REFRESH_ERROR : message,
    });
  }
}

function isAdmin(permission: string): boolean {
  return !!(Number(permission) & ADMIN_FLAG);
}

async function fetchAdminUserServer(token: string): Promise<PartialServer[]> {
  const response = await fetch(`${API_URL}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (result.message === DISCORD_NOT_AUTH) {
    throw new Error(DISCORD_NOT_AUTH);
  }

  return (result as PartialServer[]).filter(({ permissions }) =>
    isAdmin(permissions)
  );
}

async function fetchConfiguredServers(
  apiKey: string,
  userId: string,
): Promise<number[]> {
  const apiUrl = process.env.PC_API_URL;

  const response = await fetch(`${apiUrl}/config`, {
    headers: {
      Authorization: `pleasantcord ${apiKey}/${userId}`,
    },
  });

  const { data } = await response.json();

  return data;
}

export default getServers;
