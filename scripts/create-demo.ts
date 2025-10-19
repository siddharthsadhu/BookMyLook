import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function createDemoData() {
  console.log('🌱 Creating demo data...');

  try {
    // Check if we already have data
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      console.log('✅ Demo data already exists!');
      return;
    }

    console.log('📝 Creating fresh demo data...');

    // Create service categories first
    const hairCategory = await prisma.serviceCategory.create({
      data: {
        name: 'Hair',
        slug: 'hair',
        description: 'Hair styling, cutting, and treatment services',
        icon: '✂️',
      },
    });

    const skinCategory = await prisma.serviceCategory.create({
      data: {
        name: 'Skin',
        slug: 'skin',
        description: 'Facial treatments and skincare services',
        icon: '💆‍♀️',
      },
    });

    // Create salon owner
    const owner = await prisma.user.create({
      data: {
        email: 'rajesh@stylestudio.com',
        password: '$2a$10$example.hash.for.owner123',
        firstName: 'Rajesh',
        lastName: 'Kumar',
        phone: '+919876543215',
        role: 'SALON_OWNER',
        isActive: true,
        emailVerified: true,
      },
    });

    // Create salon
    const salon = await prisma.salon.create({
      data: {
        name: 'Style Studio',
        slug: 'style-studio',
        address: '123 MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        phone: '+918012345678',
        email: 'info@stylestudio.com',
        description: 'Premium unisex salon offering modern cuts, styling, and grooming services.',
        openingTime: '09:00',
        closingTime: '21:00',
        latitude: 12.9716,
        longitude: 77.5946,
        ownerId: owner.id,
        isActive: true,
        logo: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop&crop=face',
      },
    });

    // Create services
    const haircutService = await prisma.service.create({
      data: {
        name: 'Men\'s Haircut',
        description: 'Professional haircut with wash and styling',
        durationMinutes: 45,
        price: 250,
        categoryId: hairCategory.id,
        salonId: salon.id,
        isActive: true,
      },
    });

    const facialService = await prisma.service.create({
      data: {
        name: 'Facial Treatment',
        description: 'Deep cleansing facial with moisturizing',
        durationMinutes: 60,
        price: 800,
        categoryId: skinCategory.id,
        salonId: salon.id,
        isActive: true,
      },
    });

    // Create customer
    const customer = await prisma.user.create({
      data: {
        email: 'john@example.com',
        password: '$2a$10$example.hash.for.customer123',
        firstName: 'John',
        lastName: 'Smith',
        phone: '+919876543211',
        role: 'CUSTOMER',
        isActive: true,
        emailVerified: true,
      },
    });

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: 'BML-001',
        userId: customer.id,
        salonId: salon.id,
        serviceId: haircutService.id,
        appointmentDate: new Date('2024-12-20'),
        appointmentTime: '10:00',
        endTime: '10:45',
        servicePrice: 250,
        discount: 0,
        tax: 37.5,
        totalAmount: 287.5,
        depositAmount: 0,
        status: 'COMPLETED',
        paymentStatus: 'PAID',
        customerName: 'John Smith',
        customerPhone: '+919876543211',
        customerEmail: 'john@example.com',
      },
    });

    // Create queue for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.queue.create({
      data: {
        salonId: salon.id,
        date: today,
        currentNumber: 0,
        totalWaiting: 1,
        averageWaitTime: 15,
        isActive: true,
      },
    });

    // Create review
    await prisma.review.create({
      data: {
        bookingId: booking.id,
        userId: customer.id,
        salonId: salon.id,
        rating: 5,
        comment: 'Excellent service! The stylist was very professional and the haircut turned out perfect. Will definitely come back.',
        isVerified: true,
        isVisible: true,
      },
    });

    console.log('✅ Demo data created successfully!');
    console.log('\n📊 Demo Data Summary:');
    console.log(`   👥 Users: 2 (1 owner, 1 customer)`);
    console.log(`   🏪 Salons: 1`);
    console.log(`   💇 Services: 2`);
    console.log(`   📅 Bookings: 1`);
    console.log(`   ⭐ Reviews: 1`);

    console.log('\n🔐 Demo Credentials:');
    console.log('   Customer: john@example.com / customer123');
    console.log('   Owner: rajesh@stylestudio.com / owner123');

  } catch (error) {
    console.error('❌ Error creating demo data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
createDemoData()
  .then(() => {
    console.log('🎉 Demo data setup completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Demo data setup failed:', error);
    process.exit(1);
  });
