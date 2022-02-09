import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userRepository = prisma.user;

export default userRepository;
