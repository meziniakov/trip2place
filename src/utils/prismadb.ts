// @ts-nocheck
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line vars-on-top
  let prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client
