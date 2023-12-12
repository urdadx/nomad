import { db } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const { scheduleId } = req.query;

    if (!scheduleId || typeof scheduleId !== 'string') {
      throw new Error('Invalid schedule Id');
    }

    if (req.method === 'GET') {
      const scheduleDetails = await db.schedules.findFirst({
        where: {
          scheduleId: scheduleId,
        },
      });

      if (!scheduleDetails) {
        return res.status(404).json({ error: 'Schedule not found' });
      }

      return res.status(200).json(scheduleDetails);
    } else if (req.method === 'PATCH') {
      const { name, scheduleDate, location, image } = req.body;

      const updatedSchedule = await db.schedules.update({
        where: {
          scheduleId: scheduleId,
        },
        data: {
          name,
          scheduleDate,
          location,
          image,
        },
      });

      return res.status(200).json(updatedSchedule);
    } else if (req.method === 'DELETE') {
      await db.schedules.delete({
        where: {
          scheduleId: scheduleId,
        },
      });

      return res.status(204).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Bad Request' });
  }
}
