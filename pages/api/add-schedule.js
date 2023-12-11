import serverAuth from '@/lib/server-auth';
import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { name, scheduleDate, location } = req.body;

      const schedule = await db.schedules.create({
        data: {
          name,
          scheduleDate,
          location,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(schedule);
    }

    if (req.method === 'GET') {
      const { userId } = req.query;

      let schedules;

      if (userId && typeof userId === 'string') {
        schedules = await db.schedules.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
          },
        });
      }

      return res.status(200).json(schedules);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
