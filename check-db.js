import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        password: true // Don't do this in production!
      }
    });

    console.log('Users in database:');
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role}) - Password hash exists: ${!!user.password}`);
    });

    // Test password for admin
    const adminUser = users.find(u => u.email === 'admin@bookmylook.com');
    if (adminUser && adminUser.password) {
      const bcrypt = await import('bcryptjs');
      const isValid = await bcrypt.default.compare('admin123', adminUser.password);
      console.log(`Admin password valid: ${isValid}`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
