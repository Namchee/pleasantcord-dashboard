import { API_URL } from '@/constant/api';
import { NextApiRequest, NextApiResponse } from 'next';

async function getServerById(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const token = process.env.BOT_TOKEN;

  if (!token) {
    return res.status(500).json({
      data: null,
      error: 'Internal server error',
    });
  }

  const id = req.query['id'];

  if (!id || Number.isNaN(id)) {
    return res.status(400).json({
      data: null,
      error: 'Server ID is required',
    });
  }

  const response = await fetch(
    `${API_URL}/guilds/${id}?with_counts=true`,
    {
      headers: {
        Authorization: `Bot ${token}`,
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

export default getServerById;
