import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/utils/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req?.query
  const id = query?.id

  switch (req.method) {
    case 'DELETE':
      {
        const deletePlace = await prisma.listing.delete({
          where: {
            id,
          },
        })
        res.status(200).json({ deletePlace })
      }
      break

    case 'GET':
      {
        const placeById = await prisma.listing.findUnique({
          where: {
            id,
          },
        })
        res.status(200).json({ placeById })
      }
      break

    default:
      res.status(300).json({ message: 'Method is not availed' })
      break
  }
}
