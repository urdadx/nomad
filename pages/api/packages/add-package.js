import serverAuth from '@/lib/server-auth';
import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { name, tripdate, location, numSpots, cost, thumbnail, tripId } =
        req.body;

      const tripPackage = await db.tripPackages.create({
        data: {
          name,
          tripdate,
          location,
          userId: currentUser.id,
          numSpots: parseInt(numSpots),
          cost: parseInt(cost),
          thumbnail,
          tripId,
        },
      });

      return res.status(200).json(tripPackage);
    }

    if (req.method === 'GET') {
      let tripPackages;

      tripPackages = await db.tripPackages.findMany();

      return res.status(200).json(tripPackages);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
