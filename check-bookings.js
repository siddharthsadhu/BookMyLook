import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function checkBookings() {
  try {
    console.log('🔍 Checking bookings in database...');

    const totalBookings = await prisma.booking.count();
    console.log('📊 Total bookings:', totalBookings);

    if (totalBookings === 0) {
      console.log('⚠️ No bookings found in database!');
      return;
    }

    // Check for bookings with missing relations
    const bookingsWithIssues = await prisma.booking.findMany({
      where: {
        OR: [
          { userId: null },
          { salonId: null },
          { serviceId: null }
        ]
      },
      select: {
        id: true,
        userId: true,
        salonId: true,
        serviceId: true,
        bookingNumber: true
      }
    });

    console.log('⚠️ Bookings with missing relations:', bookingsWithIssues.length);
    if (bookingsWithIssues.length > 0) {
      console.log('📋 Problematic bookings:', bookingsWithIssues.slice(0, 3));
    }

    // Check a sample booking with relations
    const sampleBooking = await prisma.booking.findFirst({
      include: {
        customer: {
          select: { id: true, firstName: true, email: true }
        },
        salon: {
          select: { id: true, name: true }
        },
        service: {
          select: { id: true, name: true }
        }
      }
    });

    console.log('📋 Sample booking details:', {
      id: sampleBooking?.id,
      bookingNumber: sampleBooking?.bookingNumber,
      customer: sampleBooking?.customer ? {
        id: sampleBooking.customer.id,
        name: sampleBooking.customer.firstName,
        email: sampleBooking.customer.email
      } : 'MISSING',
      salon: sampleBooking?.salon ? {
        id: sampleBooking.salon.id,
        name: sampleBooking.salon.name
      } : 'MISSING',
      service: sampleBooking?.service ? {
        id: sampleBooking.service.id,
        name: sampleBooking.service.name
      } : 'MISSING'
    });

    // Test the exact query used in the API
    console.log('🔍 Testing API query...');
    const apiQueryResult = await prisma.booking.findMany({
      where: {},
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        salon: {
          select: {
            name: true
          }
        },
        service: {
          select: {
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: 0,
      take: 50
    });

    console.log('✅ API query successful, returned', apiQueryResult.length, 'bookings');

  } catch (error) {
    console.error('❌ Database check error:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

checkBookings();
