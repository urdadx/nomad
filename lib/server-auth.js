import { getServerSession } from 'next-auth/next';
import { db } from './db';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const serverAuth = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  const currentUser = await db.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
};

export default serverAuth;
