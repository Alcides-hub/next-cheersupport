import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Fetch all users
  const users = await prisma.user.findMany();
  console.log('Users:', users);

  // Add a new user
  const newUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });
  console.log('New User:', newUser);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
