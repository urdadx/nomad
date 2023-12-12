import { db } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const { tripId } = req.query;

    if (!tripId || typeof tripId !== 'string') {
      throw new Error('Invalid tripId');
    }

    if (req.method === 'GET') {
      const packageDetails = await db.tripPackages.findFirst({
        where: {
          tripId: tripId,
        },
      });

      if (!packageDetails) {
        return res.status(404).json({ error: 'Package not found' });
      }

      return res.status(200).json(packageDetails);
    } else if (req.method === 'PATCH') {
      const { name, date, location, numSpots, cost, thumbnail } = req.body;

      const updatedPackage = await db.tripPackages.update({
        where: {
          tripId: tripId,
        },
        data: {
          name,
          date,
          location,
          numSpots: parseInt(numSpots),
          cost: parseInt(cost),
          thumbnail,
        },
      });

      return res.status(200).json(updatedPackage);
    } else if (req.method === 'DELETE') {
      await db.tripPackages.delete({
        where: {
          tripId: tripId,
        },
      });

      return res.status(204).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Bad Request' });
  }
}
