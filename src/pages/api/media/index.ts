import prisma from '@/utils/prismadb'

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case 'GET':
      {
        const medias = await prisma.media.findMany()
        res.status(200).json({ medias })
      }
      break

    case 'DELETE':
      {
        const countDelete = await prisma.media.deleteMany()
        res.status(200).json(countDelete)
      }
      break

    case 'POST':
      {
        const body = await req.body

        let medias
        if (Array.isArray(body)) {
          medias = await prisma?.media.createMany({
            data: body,
          })
        } else {
          medias = await prisma?.media.create({
            data: body,
          })
        }

        res.status(200).json({ medias })
      }
      break

    default:
      res.status(300).json({ message: 'Method is not availed' })
      break
  }
}
