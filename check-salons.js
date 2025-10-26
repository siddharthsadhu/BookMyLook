// Check salons in database
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function checkSalons() {
  try {
    const salons = await prisma.salon.findMany({
      select: { id: true, name: true, slug: true, isActive: true }
    });
    console.log('Salons in database:', salons);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSalons();
