import prisma from '@/utils/prismadb'

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case 'GET':
      {
        let listings
        if (req.query.id) {
          listings = await prisma.listing.findMany({
            include: { medias: true },
            cursor: {
              id: req.query.id,
            },
          })
          res.status(200).json({ listings })
        } else {
          listings = await prisma.listing.findMany({
            include: { medias: true },
          })
          res.status(200).json({ listings })
        }
      }
      break

    case 'DELETE':
      {
        const countDelete = await prisma.listing.deleteMany()
        res.status(200).json(countDelete)
      }
      break
    case 'POST':
      {
        const body = await req.body
        const { title, type, description, duration, category, location } =
          body

        Object.keys(body).forEach((value: any) => {
          if (!body[value]) {
            res.status(300).json({ message: 'Ошибка' })
          }
        })

        const listing = await prisma?.listing.create({
          data: {
            title,
            type,
            duration,
            description,
            category,
            locationLabel: location.label,
            latlng: location.latlng,
          },
        })

        let medias
        if (Array.isArray(body.media)) {
          // eslint-disable-next-line no-return-assign, no-param-reassign
          body.media.map((item: any) => (item.listingId = listing.id))
          medias = await prisma?.media.createMany({
            data: body.media,
          })
        } else {
          body.listingId = listing.id
          medias = await prisma?.media.create({
            data: body.media,
          })
        }

        res.status(200).json(listing, medias)
      }
      break

    default:
      res.status(300).json({ message: 'Method is not availed' })
      break
  }

  // try {
  // } catch (err) {
  //   console.log(err)
  //   return res.status(501).json({ error: err })
  // }
}
