import { db } from '@/lib/db';
import serverAuth from '@/lib/server-auth';

export default async function handler(req, res) {
  if (req.method !== 'PATCH' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const { name, image, phone } = req.body;

    if (req.method === 'PATCH') {
      try {
        const updatedUser = await db.user.update({
          where: {
            id: currentUser.id,
          },
          data: {
            name: name,
            image: image,
            phone: phone,
          },
        });

        return res.status(200).json(updatedUser);
      } catch (error) {
        return new Response(
          `Could not update user info at this time. ${error}`,
          {
            status: 500,
          }
        );
      }
    } else if (req.method === 'DELETE') {
      await db.user.delete({
        where: {
          id: currentUser.id,
        },
      });
      return res.status(204).end();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
