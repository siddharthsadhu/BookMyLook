import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';

// Initialize Prisma Client with logging
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  console.log('🌱 Starting comprehensive database seed...');

  // Clear existing data (in correct order due to foreign keys)
  console.log('🗑️  Clearing existing data...');
  try {
    await prisma.booking?.deleteMany({});
    await prisma.review?.deleteMany({});
    await prisma.service?.deleteMany({});
    await prisma.salon?.deleteMany({});
    await prisma.user?.deleteMany({});
  } catch (error) {
    console.log('Some models may not exist, continuing...');
  }

  console.log('👤 Creating users...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@bookmylook.com',
      phone: '+919999999999',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      emailVerified: true,
      phoneVerified: true
    }
  });

  // Create salon owners
  const owner1Password = await bcrypt.hash('owner123', 10);
  const salonOwner1 = await prisma.user.create({
    data: {
      email: 'rajesh@stylestudio.com',
      phone: '+919876543210',
      password: owner1Password,
      firstName: 'Rajesh',
      lastName: 'Kumar',
      role: 'SALON_OWNER',
      emailVerified: true,
      phoneVerified: true
    }
  });

  const owner2Password = await bcrypt.hash('owner456', 10);
  const salonOwner2 = await prisma.user.create({
    data: {
      email: 'priya@beautylounge.com',
      phone: '+919876543211',
      password: owner2Password,
      firstName: 'Priya',
      lastName: 'Sharma',
      role: 'SALON_OWNER',
      emailVerified: true,
      phoneVerified: true
    }
  });

  // Create staff users
  const staff1Password = await bcrypt.hash('staff123', 10);
  const staffUser1 = await prisma.user.create({
    data: {
      email: 'ravi@stylestudio.com',
      phone: '+919876543212',
      password: staff1Password,
      firstName: 'Ravi',
      lastName: 'Singh',
      role: 'STAFF',
      emailVerified: true
    }
  });

  const staff2Password = await bcrypt.hash('staff456', 10);
  const staffUser2 = await prisma.user.create({
    data: {
      email: 'kavita@beautylounge.com',
      phone: '+919876543213',
      password: staff2Password,
      firstName: 'Kavita',
      lastName: 'Patel',
      role: 'STAFF',
      emailVerified: true
    }
  });

  // Create customers
  const customer1Password = await bcrypt.hash('customer123', 10);
  const customer1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      phone: '+919876543214',
      password: customer1Password,
      firstName: 'John',
      lastName: 'Doe',
      role: 'CUSTOMER',
      emailVerified: true
    }
  });

  const customer2Password = await bcrypt.hash('customer456', 10);
  const customer2 = await prisma.user.create({
    data: {
      email: 'sarah@example.com',
      phone: '+919876543215',
      password: customer2Password,
      firstName: 'Sarah',
      lastName: 'Wilson',
      role: 'CUSTOMER',
      emailVerified: true
    }
  });

  console.log('🏪 Creating salons...');

  // Create salons
  const salon1 = await prisma.salon.create({
    data: {
      name: 'Style Studio Premium',
      slug: 'style-studio-premium',
      description: 'Premium hair salon with experienced stylists and modern equipment. Specializing in contemporary cuts, coloring, and styling for men and women.',
      ownerId: salonOwner1.id,
      email: 'info@stylestudio.com',
      phone: '+919876543210',
      address: '123 Main Street, Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560034',
      latitude: 12.9352,
      longitude: 77.6245,
      openingTime: '09:00',
      closingTime: '21:00',
      workingDays: [1, 2, 3, 4, 5, 6], // Mon to Sat
      isActive: true,
      isVerified: true,
      acceptsOnlinePayment: true,
      instantBooking: true,
      averageRating: 4.5,
      totalReviews: 125
    }
  });

  const salon2 = await prisma.salon.create({
    data: {
      name: 'Beauty Lounge',
      slug: 'beauty-lounge',
      description: 'Full-service beauty salon offering hair, skin, and nail treatments. Professional services with premium products and expert technicians.',
      ownerId: salonOwner2.id,
      email: 'contact@beautylounge.com',
      phone: '+919876543211',
      address: '456 Park Avenue, Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
      openingTime: '10:00',
      closingTime: '20:00',
      workingDays: [1, 2, 3, 4, 5, 6, 0], // All week
      isActive: true,
      isVerified: true,
      acceptsOnlinePayment: true,
      instantBooking: false,
      averageRating: 4.2,
      totalReviews: 89
    }
  });

  const salon3 = await prisma.salon.create({
    data: {
      name: 'Glamour Spa & Salon',
      slug: 'glamour-spa-salon',
      description: 'Luxury spa and salon experience combining traditional and modern beauty treatments. Relaxing atmosphere with expert care.',
      ownerId: salonOwner1.id,
      email: 'hello@glamourspa.com',
      phone: '+919876543216',
      address: '789 Luxury Mall, MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      openingTime: '08:00',
      closingTime: '22:00',
      workingDays: [0, 1, 2, 3, 4, 5, 6], // All days
      isActive: true,
      isVerified: true,
      acceptsOnlinePayment: true,
      instantBooking: true,
      averageRating: 4.7,
      totalReviews: 203
    }
  });

  console.log('✂️  Creating services...');

  // First create a default service category
  const defaultCategory = await prisma.serviceCategory.create({
    data: {
      name: 'General Services',
      slug: 'general-services',
      description: 'General beauty and grooming services',
      icon: 'scissors'
    }
  });

  // Create services for salon1
  const service1 = await prisma.service.create({
    data: {
      salonId: salon1.id,
      categoryId: defaultCategory.id,
      name: "Men's Haircut",
      description: 'Professional haircut with styling and consultation',
      price: 300,
      discountPrice: 250,
      durationMinutes: 30,
      isActive: true,
      requiresDeposit: false
    }
  });

  const service2 = await prisma.service.create({
    data: {
      salonId: salon1.id,
      categoryId: defaultCategory.id,
      name: 'Hair Color',
      description: 'Premium hair coloring service with ammonia-free dyes',
      price: 1500,
      durationMinutes: 90,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 500
    }
  });

  const service3 = await prisma.service.create({
    data: {
      salonId: salon1.id,
      categoryId: defaultCategory.id,
      name: 'Beard Grooming',
      description: 'Complete beard trimming and styling service',
      price: 200,
      durationMinutes: 20,
      isActive: true
    }
  });

  // Services for salon2
  const service4 = await prisma.service.create({
    data: {
      salonId: salon2.id,
      categoryId: defaultCategory.id,
      name: "Women's Haircut",
      description: 'Stylish haircut with consultation and blow-dry',
      price: 500,
      discountPrice: 450,
      durationMinutes: 45,
      isActive: true
    }
  });

  const service5 = await prisma.service.create({
    data: {
      salonId: salon2.id,
      categoryId: defaultCategory.id,
      name: 'Manicure & Pedicure',
      description: 'Complete nail care package with premium polish',
      price: 800,
      discountPrice: 699,
      durationMinutes: 60,
      isActive: true
    }
  });

  const service6 = await prisma.service.create({
    data: {
      salonId: salon2.id,
      categoryId: defaultCategory.id,
      name: 'Facial Treatment',
      description: 'Deep cleansing facial with massage and mask',
      price: 1200,
      durationMinutes: 60,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 400
    }
  });

  // Services for salon3
  const service7 = await prisma.service.create({
    data: {
      salonId: salon3.id,
      categoryId: defaultCategory.id,
      name: 'Full Body Spa',
      description: 'Relaxing full body spa treatment with aromatherapy',
      price: 3000,
      discountPrice: 2700,
      durationMinutes: 120,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 1000
    }
  });

  const service8 = await prisma.service.create({
    data: {
      salonId: salon3.id,
      categoryId: defaultCategory.id,
      name: 'Bridal Makeup',
      description: 'Complete bridal makeup with trial session',
      price: 5000,
      durationMinutes: 90,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 2000
    }
  });

  const service9 = await prisma.service.create({
    data: {
      salonId: salon3.id,
      categoryId: defaultCategory.id,
      name: 'Keratin Treatment',
      description: 'Professional keratin hair treatment for smooth hair',
      price: 2500,
      durationMinutes: 120,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 800
    }
  });

  console.log('📅 Creating sample bookings...');

  // Create sample bookings
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const dayAfter = new Date(tomorrow);
  dayAfter.setDate(dayAfter.getDate() + 1);

  // Past bookings
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  try {
    // Confirmed booking for tomorrow
    const booking1 = await prisma.booking.create({
      data: {
        bookingNumber: 'BML-' + Date.now() + '-001',
        userId: customer1.id,
        salonId: salon1.id,
        serviceId: service1.id,
        appointmentDate: tomorrow,
        appointmentTime: '14:00',
        endTime: '14:30',
        servicePrice: 250,
        discount: 50,
        tax: 45,
        totalAmount: 295,
        status: 'CONFIRMED',
        paymentStatus: 'PENDING',
        customerName: 'John Doe',
        customerPhone: '+919876543214',
        customerEmail: 'john@example.com',
        notes: 'First time customer'
      }
    });

    // Completed booking from yesterday
    const booking2 = await prisma.booking.create({
      data: {
        bookingNumber: 'BML-' + Date.now() + '-002',
        userId: customer2.id,
        salonId: salon2.id,
        serviceId: service4.id,
        appointmentDate: yesterday,
        appointmentTime: '10:00',
        endTime: '10:45',
        servicePrice: 450,
        discount: 50,
        tax: 81,
        totalAmount: 481,
        status: 'COMPLETED',
        paymentStatus: 'PAID',
        customerName: 'Sarah Wilson',
        customerPhone: '+919876543215',
        customerEmail: 'sarah@example.com'
      }
    });

    // Another upcoming booking
    const booking3 = await prisma.booking.create({
      data: {
        bookingNumber: 'BML-' + Date.now() + '-003',
        userId: customer1.id,
        salonId: salon3.id,
        serviceId: service7.id,
        appointmentDate: dayAfter,
        appointmentTime: '15:00',
        endTime: '17:00',
        servicePrice: 2700,
        discount: 300,
        tax: 486,
        totalAmount: 2886,
        status: 'CONFIRMED',
        paymentStatus: 'PARTIAL',
        customerName: 'John Doe',
        customerPhone: '+919876543214',
        customerEmail: 'john@example.com',
        notes: 'Birthday special treatment'
      }
    });

    console.log('⭐ Creating sample reviews...');

    // Create reviews
    try {
      await prisma.review.create({
        data: {
          bookingId: booking2.id,
          userId: customer2.id,
          salonId: salon2.id,
          rating: 5,
          comment: 'Excellent service! Very professional and friendly staff. The haircut was perfect and exactly what I wanted.',
          serviceRating: 5,
          ambienceRating: 4,
          cleanlinessRating: 5,
          staffRating: 5,
          valueRating: 4,
          isVerified: true,
          isVisible: true
        }
      });

      await prisma.review.create({
        data: {
          bookingId: booking1.id,
          userId: customer1.id,
          salonId: salon1.id,
          rating: 4,
          comment: 'Good service overall. The stylist was skilled but there was a small wait. Will definitely come back.',
          serviceRating: 4,
          ambienceRating: 4,
          cleanlinessRating: 5,
          staffRating: 4,
          valueRating: 4,
          isVerified: true,
          isVisible: true
        }
      });

      await prisma.review.create({
        data: {
          bookingId: booking3.id,
          userId: customer1.id,
          salonId: salon3.id,
          rating: 5,
          comment: 'Amazing spa experience! The staff was incredibly professional and the facilities were top-notch. Highly recommend!',
          serviceRating: 5,
          ambienceRating: 5,
          cleanlinessRating: 5,
          staffRating: 5,
          valueRating: 5,
          isVerified: false,
          isVisible: true
        }
      });

    } catch (error) {
      console.log('Review creation failed, skipping...');
    }
  } catch (error) {
    console.log('Booking creation failed, skipping...');
  }

  console.log('✅ Database seeded successfully!');

  console.log('\n📧 Test Credentials:');
  console.log('================================');
  console.log('Admin User:');
  console.log('Email: admin@bookmylook.com');
  console.log('Password: admin123');
  console.log('\nSalon Owners:');
  console.log('Rajesh Kumar - Email: rajesh@stylestudio.com, Password: owner123');
  console.log('Priya Sharma - Email: priya@beautylounge.com, Password: owner456');
  console.log('\nStaff:');
  console.log('Ravi Singh - Email: ravi@stylestudio.com, Password: staff123');
  console.log('Kavita Patel - Email: kavita@beautylounge.com, Password: staff456');
  console.log('\nCustomers:');
  console.log('John Doe - Email: john@example.com, Password: customer123');
  console.log('Sarah Wilson - Email: sarah@example.com, Password: customer456');
  console.log('================================\n');

  console.log('🏪 Available Salons:');
  console.log('1. Style Studio Premium (Bangalore) - Hair services');
  console.log('2. Beauty Lounge (Delhi) - Full beauty services');
  console.log('3. Glamour Spa & Salon (Mumbai) - Luxury spa treatments');
  console.log('\n✅ Ready for testing! Visit http://localhost:8080');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
