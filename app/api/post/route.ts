import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

import { PrismaClient, Prisma } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
export async function GET(request: NextRequest) {
  const adapter = new PrismaD1(getRequestContext().env.DB)
  const prisma = new PrismaClient({ adapter })
  prisma.$connect()
  const responseJson = await prisma.article.findMany({
    include: {
      author: true,
    },
  })
  console.log(responseJson);
  return Response.json(responseJson);
}
