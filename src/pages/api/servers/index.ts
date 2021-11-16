import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { ADMIN_FLAG, API_URL } from '@/constant/api';
import { Server } from '@/entity/server';

async function getServers(
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

  const result = await Promise.all([
    fetchAdminUserServer(accessToken),
    fetchBotServer(process.env.BOT_TOKEN as string),
  ]);

  const botServers = result[1].map((s) => s.id);

  const servers = result[0].filter(({ id }) => {
    return botServers.includes(id);
  });

  return res.status(200).json({
    data: servers,
    error: null,
  });
}

function isAdmin(permission: string): boolean {
  return !!(Number(permission) & ADMIN_FLAG);
}

async function fetchAdminUserServer(token: string): Promise<Server[]> {
  const result = await fetch(
    `${API_URL}/users/@me/guilds`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const servers: Server[] = await result.json();

  return servers.filter(({ permissions }) => isAdmin(permissions));
}

async function fetchBotServer(token: string): Promise<Server[]> {
  const result = await fetch(
    `${API_URL}/users/@me/guilds`,
    {
      headers: {
        Authorization: `Bot ${token}`,
      },
    }
  );

  return result.json();
}

export default getServers;
