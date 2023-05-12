import prisma from '@/utils/prismadb'

const getListings = async () => {
  const listings = await prisma.listing.findMany()

  return listings
}
export default getListings
