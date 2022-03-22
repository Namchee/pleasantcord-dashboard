import { NextApiRequest, NextApiResponse } from 'next';

import { getToken } from 'next-auth/jwt';

export async function handleConfigRequest(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  switch (req.method) {
    case 'GET': return getServerConfig(req, res);
    case 'PATCH': return updateServerConfig(req, res);
    default: return res.status(405).json({
      data: null,
      error: 'Illegal HTTP method',
    });
  }
}

async function getServerConfig(
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
    return res.status(400).json({
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

  const { data, error } = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({
      data: null,
      error,
    });
  }

  return res.status(200).json({
    data,
    error: null,
  });
}

async function updateServerConfig(
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

  const body = JSON.parse(req.body);

  const response = await fetch(
    `${apiUrl}/config/${serverId}`,
    {
      headers: {
        Authorization: `pleasantcord ${apiKey}/${token.userId}`,
      },
      method: 'PATCH',
      body: JSON.stringify({
        accuracy: body.accuracy / 100,
        categories: body.categories,
        delete: body.delete === 'true',
        model: body.model,
        contents: body.contents,
      }),
    },
  );

  const resp = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({
      data: null,
      error: resp.error,
    });
  }

  return res.status(200).json({
    data: 'ok',
    error: null,
  });
}

export default handleConfigRequest;
