import { PrismaClient } from './generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function debugLogin() {
  try {
    console.log('🔍 Checking database users...');

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        password: true,
        isActive: true
      }
    });

    console.log(`Found ${users.length} users in database:`);
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role}) - Active: ${user.isActive}`);
    });

    // Test specific user
    const adminUser = users.find(u => u.email === 'admin@bookmylook.com');
    if (adminUser) {
      console.log('\n🔐 Testing admin password...');
      console.log('User found:', adminUser.email);
      console.log('Password hash exists:', !!adminUser.password);
      console.log('User is active:', adminUser.isActive);

      if (adminUser.password) {
        const isValid = await bcrypt.compare('admin123', adminUser.password);
        console.log('Password validation result:', isValid);
      }
    } else {
      console.log('❌ Admin user not found in database!');
    }

    // Test database connection
    console.log('\n🔌 Testing database connection...');
    await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database connection OK');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

debugLogin();
