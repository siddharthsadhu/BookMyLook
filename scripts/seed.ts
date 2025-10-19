import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@bookmylook.com',
        password: '$2a$10$example.hash.for.admin123',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+919876543210',
        role: 'ADMIN',
        isActive: true,
        emailVerified: true,
      },
    });

    // Create customer users
    const customers = [
      {
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Smith',
        phone: '+919876543211',
        role: 'CUSTOMER' as const,
      },
      {
        email: 'sarah@example.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        phone: '+919876543212',
        role: 'CUSTOMER' as const,
      },
    ];

    const createdCustomers = [];
    for (const customer of customers) {
      const user = await prisma.user.create({
        data: {
          ...customer,
          password: '$2a$10$example.hash.for.customer123',
          isActive: true,
          emailVerified: true,
        },
      });
      createdCustomers.push(user);
    }

    // Create salon owners
    const salonOwners = [
      {
        email: 'rajesh@stylestudio.com',
        firstName: 'Rajesh',
        lastName: 'Kumar',
        phone: '+919876543215',
        role: 'SALON_OWNER' as const,
      },
    ];

    const createdOwners = [];
    for (const owner of salonOwners) {
      const user = await prisma.user.create({
        data: {
          ...owner,
          password: '$2a$10$example.hash.for.owner123',
          isActive: true,
          emailVerified: true,
        },
      });
      createdOwners.push(user);
    }

    // Create salons
    const salons = [
      {
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
        ownerId: createdOwners[0].id,
        isActive: true,
        logo: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop&crop=face',
      },
    ];

    const createdSalons = [];
    for (const salon of salons) {
      const createdSalon = await prisma.salon.create({
        data: salon,
      });
      createdSalons.push(createdSalon);
    }

    // Create service categories
    const categories = [
      {
        name: 'Hair',
        slug: 'hair',
        description: 'Hair styling, cutting, and treatment services',
        icon: '✂️',
      },
      {
        name: 'Skin',
        slug: 'skin',
        description: 'Facial treatments and skincare services',
        icon: '💆‍♀️',
      },
      {
        name: 'Nails',
        slug: 'nails',
        description: 'Manicure and pedicure services',
        icon: '💅',
      },
      {
        name: 'Makeup',
        slug: 'makeup',
        description: 'Professional makeup and beauty services',
        icon: '💄',
      },
      {
        name: 'Spa',
        slug: 'spa',
        description: 'Relaxing spa and wellness treatments',
        icon: '🧖‍♀️',
      },
      {
        name: 'Grooming',
        slug: 'grooming',
        description: 'Men\'s grooming and beard services',
        icon: '🪒',
      },
    ];

    const createdCategories = [];
    for (const category of categories) {
      const createdCategory = await prisma.serviceCategory.create({
        data: category,
      });
      createdCategories.push(createdCategory);
    }

    // Create services
    const services = [
      {
        name: 'Men\'s Haircut',
        description: 'Professional haircut with wash and styling',
        durationMinutes: 45,
        price: 250,
        categoryId: createdCategories[0].id, // Hair
        salonId: createdSalons[0].id,
        isActive: true,
      },
      {
        name: 'Women\'s Haircut',
        description: 'Modern haircut with consultation and styling',
        durationMinutes: 60,
        price: 400,
        categoryId: createdCategories[0].id, // Hair
        salonId: createdSalons[0].id,
        isActive: true,
      },
    ];

    const createdServices = [];
    for (const service of services) {
      const createdService = await prisma.service.create({
        data: service,
      });
      createdServices.push(createdService);
    }

    // Create bookings
    const bookings = [
      {
        bookingNumber: 'BML-001',
        userId: createdCustomers[0].id,
        salonId: createdSalons[0].id,
        serviceId: createdServices[0].id,
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
    ];

    const createdBookings = [];
    for (const booking of bookings) {
      const createdBooking = await prisma.booking.create({
        data: booking,
      });
      createdBookings.push(createdBooking);
    }

    // Create queue for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const queues = [];
    for (const salon of createdSalons) {
      const queue = await prisma.queue.create({
        data: {
          salonId: salon.id,
          date: today,
          currentNumber: 0,
          totalWaiting: 2,
          averageWaitTime: 15,
          isActive: true,
        },
      });
      queues.push(queue);
    }

    // Create queue entries
    const queueEntries = [
      {
        queueId: queues[0].id,
        bookingId: createdBookings[0].id,
        tokenNumber: 1,
        position: 1,
        estimatedTime: '12:30',
        status: 'WAITING',
      },
    ];

    for (const entry of queueEntries) {
      await prisma.queueEntry.create({
        data: entry,
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Demo Data Summary:');
    console.log(`   👥 Users: ${1 + customers.length + salonOwners.length}`);
    console.log(`   🏪 Salons: ${salons.length}`);
    console.log(`   💇 Services: ${services.length}`);
    console.log(`   📅 Bookings: ${bookings.length}`);
    console.log(`   ⏱️ Queue Entries: ${queueEntries.length}`);

    console.log('\n🔐 Demo Credentials:');
    console.log('   Admin: admin@bookmylook.com / admin123');
    console.log('   Customer: john@example.com / customer123');
    console.log('   Owner: rajesh@stylestudio.com / owner123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
