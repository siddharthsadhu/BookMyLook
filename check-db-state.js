// Check current database state
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('=== DATABASE CHECK ===\n');

    // Check users
    const users = await prisma.user.findMany({
      select: { id: true, email: true, firstName: true, lastName: true, role: true, phone: true }
    });
    console.log('👥 USERS:', users.length);
    users.forEach(user => {
      console.log(`  - ${user.firstName} ${user.lastName} (${user.role}): ${user.email}`);
    });

    // Check salons
    const salons = await prisma.salon.findMany({
      select: { id: true, name: true, ownerId: true, city: true }
    });
    console.log('\n🏪 SALONS:', salons.length);
    salons.forEach(salon => {
      console.log(`  - ${salon.name} (${salon.city})`);
    });

    // Check services
    const services = await prisma.service.count();
    console.log('\n✂️ SERVICES:', services);

    // Check categories
    const categories = await prisma.serviceCategory.count();
    console.log('🏷️ SERVICE CATEGORIES:', categories);

  } catch (error) {
    console.error('❌ Database check failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
