import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

const users = [
  {
    id: crypto.randomUUID(),
    name: 'john doe',
    email: 'john.doe@gmail.com',
    password: '$2b$10$uOWfP0uixLTemfdVWiqj3.vAsLYWgnnevUTt8a1426GOA7rLJwDkK',
    role: 'CEO',
    department: 'EXECUTIVE',
    manager: 'john.doe@gmail.com',
  },
];

async function main() {
  await prisma.user.createMany({
    data: users,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
