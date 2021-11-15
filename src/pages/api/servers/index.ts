import { ADMIN_FLAG, API_URL } from '@/constant/api';
import { Server } from '@/entity/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

async function getServers(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });

  if (!token) {
    return res.status(500).json({
      data: null,
      error: 'User is not authenticated',
    });
  }

  const accessToken = token?.accessToken;

  const result = await fetch(
    `${API_URL}/users/@me/guilds`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!result.ok) {
    return res.status(500).json({
      data: null,
      error: result.statusText,
    });
  }

  const json: Server[] = await result.json();
  const adminServer = json.filter((s) => {
    return isAdmin(s.permissions);
  });

  return res.status(200).json({
    data: adminServer,
    error: null,
  });
}

function isAdmin(permission: string): boolean {
  return !!(Number(permission) & ADMIN_FLAG);
}

export default getServers;
