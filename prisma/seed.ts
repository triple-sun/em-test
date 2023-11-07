import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

const prisma = new PrismaClient();

const getSeedUserPassHash = async () => {
  const pass = process.env['SEED_USER_PASS'];
  const salt = await genSalt(10);

  if (!pass) {
    throw new Error('Seed user password is undefined');
  }

  return await hash(pass, salt);
};

async function fillDb() {
  const seedUserPassHash = await getSeedUserPassHash();

  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Андрей',
      email: 'andrew@mail.local',
      passwordHash: seedUserPassHash,
      updates: {
        connectOrCreate: {
          where: {
            id: 1,
            userId: 1,
          },
          create: {
            update: 'User created',
          },
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Юлия',
      email: 'yulia@mail.local',
      passwordHash: seedUserPassHash,
      updates: {
        connectOrCreate: [
          {
            where: {
              id: 2,
              userId: 2,
            },
            create: {
              update: 'User created',
            },
          },
          {
            where: {
              id: 3,
              userId: 2,
            },
            create: {
              update: 'User password was changed',
            },
          },
        ],
      },
    },
  });

  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
