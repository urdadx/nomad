import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
    }

    const existingUser = await db.user.findUnique({
      where: {
        id: id,
      },
      include: {
        tripPackages: true,
        schedules: true,
      },
    });

    return res.status(200).json({ ...existingUser });
  } catch (error) {
    return res.status(400).end();
  }
}
