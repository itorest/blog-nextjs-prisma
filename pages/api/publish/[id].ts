import prisma from '../../../lib/prisma';
import { NextApiHandler } from 'next';

// PUT /api/publish/:id
const handle: NextApiHandler = async (req, res) => {
  const postId = req.query.id;
  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: { published: true },
  });
  res.json(post);
};
export default handle;
