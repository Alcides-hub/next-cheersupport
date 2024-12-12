import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Fetch all users
  const users = await prisma.user.findMany();
  console.log('Users:', users);

  // Add a new user
  const newUser = await prisma.user.create({
    data: {
        id: '12345',
        email_address: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        image_url: 'https://example.com/avatar.png',
        banner_url: 'https://example.com/banner.png',
        username: 'testuser',
    },
  });
  console.log('New User:', newUser);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
