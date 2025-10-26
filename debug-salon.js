// Debug salon fetching with full include
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function debugSalon() {
  try {
    console.log('Testing salon fetch with full include...');

    const salon = await prisma.salon.findFirst({
      where: {
        OR: [
          { id: 'parmar-luxury-salon-spa' },
          { slug: 'parmar-luxury-salon-spa' }
        ],
        isActive: true
      },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { price: 'asc' }
        },
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        reviews: {
          where: { isVisible: true },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            bookings: true
          }
        }
      }
    });

    if (salon) {
      console.log('Salon found:', salon.name);
      console.log('Has services:', salon.services.length);
      console.log('Has reviews:', salon.reviews.length);
    } else {
      console.log('Salon not found');
    }

  } catch (error) {
    console.error('Error fetching salon:', error);
    console.error('Error details:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
  } finally {
    await prisma.$disconnect();
  }
}

debugSalon();
