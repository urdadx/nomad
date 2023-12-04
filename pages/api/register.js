import { hash } from 'bcrypt';
import { db } from '@/lib/db';

export default async function handler(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    res.status(400).send('User already exists');
  } else {
    const user = await db.user.create({
      data: {
        name: name,
        email: email,
        password: await hash(password, 10),
      },
    });
    res.status(200).json(user);
  }
}
