import { faker } from '@faker-js/faker';
import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

import { PrismaClient, Prisma } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'


function fakeUserData(count: number): Prisma.UserCreateInput[] {
  return Array.from({ length: count }, (_, i) => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
    articles: {
      create: [
        {
          title: faker.lorem.words(),
          content: faker.lorem.text(),
          cover: faker.image.abstract(),
        },
      ],
    },
  }))
}

export async function GET(request: NextRequest) {
  const adapter = new PrismaD1(getRequestContext().env.DB)
  const prisma = new PrismaClient({ adapter })
  await prisma.$connect()
  const deleteUsers = await prisma.user.deleteMany({})
  await prisma.article.deleteMany({})
  console.log(`Start seeding ...`)
  const userData = fakeUserData(9)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)

  return new Response('feeded!')
}
