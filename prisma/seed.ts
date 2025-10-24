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
    // Delete tables with foreign key references first
    await prisma.queueEntry?.deleteMany({});
    await prisma.payment?.deleteMany({});
    await prisma.review?.deleteMany({});
    await prisma.transaction?.deleteMany({});
    await prisma.loyaltyPoint?.deleteMany({});
    await prisma.address?.deleteMany({});
    await prisma.favorite?.deleteMany({});
    await prisma.notification?.deleteMany({});
    await prisma.booking?.deleteMany({});
    await prisma.promotion?.deleteMany({});
    await prisma.gallery?.deleteMany({});
    await prisma.workingHour?.deleteMany({});
    await prisma.holiday?.deleteMany({});
    await prisma.service?.deleteMany({});
    await prisma.queue?.deleteMany({});
    await prisma.salon?.deleteMany({});
    await prisma.passwordReset?.deleteMany({});
    await prisma.oAuthProvider?.deleteMany({});
    await prisma.user?.deleteMany({});
    await prisma.serviceCategory?.deleteMany({});
  } catch (error) {
    console.log('Some models may not exist, continuing...');
  }

  console.log('👤 Creating users...');

  // Remove any existing admin users to prevent duplicates
  console.log('🗑️  Removing existing admin users...');
  await prisma.user.deleteMany({
    where: { role: 'ADMIN' }
  });

  // Create additional admin user (Siddharth Sadhu) - KEEP EXISTING
  const userAdminPassword = await bcrypt.hash('Sadhu@2006', 10);
  const userAdmin = await prisma.user.create({
    data: {
      email: 'siddharthsadhu28@gmail.com',
      phone: '+919265428944',
      password: userAdminPassword,
      firstName: 'Siddharth',
      lastName: 'Sadhu',
      role: 'ADMIN',
      emailVerified: true,
      phoneVerified: true
    }
  });

  // Create default admin user
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

  // Create more salon owners with Gujarati names
  const owner1Password = await bcrypt.hash('owner123', 10);
  const salonOwner1 = await prisma.user.create({
    data: {
      email: 'rajesh@patelbeautystudio.com',
      phone: '+917927412345',
      password: owner1Password,
      firstName: 'Rajesh',
      lastName: 'Patel',
      role: 'SALON_OWNER',
      emailVerified: true,
      phoneVerified: true
    }
  });

  const owner2Password = await bcrypt.hash('owner456', 10);
  const salonOwner2 = await prisma.user.create({
    data: {
      email: 'priya@shahbeautylounge.com',
      phone: '+917927412346',
      password: owner2Password,
      firstName: 'Priya',
      lastName: 'Shah',
      role: 'SALON_OWNER',
      emailVerified: true,
      phoneVerified: true
    }
  });

  // Additional salon owners with Gujarati names
  const owner3Password = await bcrypt.hash('owner789', 10);
  const salonOwner3 = await prisma.user.create({
    data: {
      email: 'vikas@joshigrooming.com',
      phone: '+917927412348',
      password: owner3Password,
      firstName: 'Vikas',
      lastName: 'Joshi',
      role: 'SALON_OWNER',
      emailVerified: true,
      phoneVerified: true
    }
  });

  const owner4Password = await bcrypt.hash('owner101', 10);
  const salonOwner4 = await prisma.user.create({
    data: {
      email: 'meera@mehtabeautysalon.com',
      phone: '+912652412349',
      password: owner4Password,
      firstName: 'Meera',
      lastName: 'Mehta',
      role: 'SALON_OWNER',
      emailVerified: true,
      phoneVerified: true
    }
  });

  const owner5Password = await bcrypt.hash('owner202', 10);
  const salonOwner5 = await prisma.user.create({
    data: {
      email: 'arjun@parmarluxury.com',
      phone: '+912612412350',
      password: owner5Password,
      firstName: 'Arjun',
      lastName: 'Parmar',
      role: 'SALON_OWNER',
      emailVerified: true,
      phoneVerified: true
    }
  });

  // Create customers with Gujarati names
  const customer1Password = await bcrypt.hash('customer123', 10);
  const customer1 = await prisma.user.create({
    data: {
      email: 'rahul@example.com',
      phone: '+917927412353',
      password: customer1Password,
      firstName: 'Rahul',
      lastName: 'Patel',
      role: 'CUSTOMER',
      emailVerified: true
    }
  });

  const customer2Password = await bcrypt.hash('customer456', 10);
  const customer2 = await prisma.user.create({
    data: {
      email: 'priya@example.com',
      phone: '+917927412354',
      password: customer2Password,
      firstName: 'Priya',
      lastName: 'Shah',
      role: 'CUSTOMER',
      emailVerified: true
    }
  });

  // Additional customers
  const customer3Password = await bcrypt.hash('customer789', 10);
  const customer3 = await prisma.user.create({
    data: {
      email: 'mike@example.com',
      phone: '+919876543222',
      password: customer3Password,
      firstName: 'Mike',
      lastName: 'Johnson',
      role: 'CUSTOMER',
      emailVerified: true
    }
  });

  const customer4Password = await bcrypt.hash('customer101', 10);
  const customer4 = await prisma.user.create({
    data: {
      email: 'emma@example.com',
      phone: '+919876543223',
      password: customer4Password,
      firstName: 'Emma',
      lastName: 'Davis',
      role: 'CUSTOMER',
      emailVerified: true
    }
  });

  const customer5Password = await bcrypt.hash('customer202', 10);
  const customer5 = await prisma.user.create({
    data: {
      email: 'alex@example.com',
      phone: '+919876543224',
      password: customer5Password,
      firstName: 'Alex',
      lastName: 'Brown',
      role: 'CUSTOMER',
      emailVerified: true
    }
  });

  const customer6Password = await bcrypt.hash('customer303', 10);
  const customer6 = await prisma.user.create({
    data: {
      email: 'lisa@example.com',
      phone: '+919876543225',
      password: customer6Password,
      firstName: 'Lisa',
      lastName: 'Garcia',
      role: 'CUSTOMER',
      emailVerified: true
    }
  });

  const customer7Password = await bcrypt.hash('customer404', 10);
  const customer7 = await prisma.user.create({
    data: {
      email: 'david@example.com',
      phone: '+919876543226',
      password: customer7Password,
      firstName: 'David',
      lastName: 'Miller',
      role: 'CUSTOMER',
      emailVerified: true
    }
  });

  const customer8Password = await bcrypt.hash('customer505', 10);
  const customer8 = await prisma.user.create({
    data: {
      email: 'anna@example.com',
      phone: '+919876543227',
      password: customer8Password,
      firstName: 'Anna',
      lastName: 'Taylor',
      role: 'CUSTOMER',
      emailVerified: true
    }
  });

  console.log('🏪 Creating salons...');

  // Create salons with Ahmedabad/Gujarat locations
  const salon1 = await prisma.salon.create({
    data: {
      name: 'Patel Beauty Studio',
      slug: 'patel-beauty-studio',
      description: 'Premium beauty salon in the heart of Ahmedabad, specializing in traditional and modern beauty services. Expert stylists with years of experience in bridal makeup and hair styling.',
      ownerId: salonOwner1.id,
      email: 'info@patelbeautystudio.com',
      phone: '+917927412345',
      address: '123 CG Road, Navrangpura',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380009',
      latitude: 23.0339,
      longitude: 72.5633,
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
      name: 'Shah Beauty Lounge',
      slug: 'shah-beauty-lounge',
      description: 'Full-service beauty salon offering hair, skin, and nail treatments in Ahmedabad. Professional services with premium products and expert technicians from Gujarat.',
      ownerId: salonOwner2.id,
      email: 'contact@shahbeautylounge.com',
      phone: '+917927412346',
      address: '456 SG Highway, Prahlad Nagar',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380015',
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
      name: 'Desai Spa & Salon',
      slug: 'desai-spa-salon',
      description: 'Luxury spa and salon experience in Gandhinagar combining traditional and modern beauty treatments. Relaxing atmosphere with expert care and authentic Gujarat hospitality.',
      ownerId: salonOwner1.id,
      email: 'hello@desaispa.com',
      phone: '+917927412347',
      address: '789 Sector 21, Gandhinagar',
      city: 'Gandhinagar',
      state: 'Gujarat',
      pincode: '382021',
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

  // Additional salons in Ahmedabad and Gujarat
  const salon4 = await prisma.salon.create({
    data: {
      name: 'Joshi Grooming Hub',
      slug: 'joshi-grooming-hub',
      description: 'Modern grooming salon in Ahmedabad specializing in men\'s grooming services. Professional barbers with attention to detail and customer satisfaction.',
      ownerId: salonOwner3.id,
      email: 'info@joshigrooming.com',
      phone: '+917927412348',
      address: '321 Satellite Road, Satellite',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380015',
      openingTime: '09:30',
      closingTime: '20:30',
      workingDays: [1, 2, 3, 4, 5, 6, 0], // All days
      isActive: true,
      isVerified: true,
      acceptsOnlinePayment: true,
      instantBooking: true,
      averageRating: 4.3,
      totalReviews: 67
    }
  });

  const salon5 = await prisma.salon.create({
    data: {
      name: 'Mehta Beauty Salon',
      slug: 'mehta-beauty-salon',
      description: 'Intimate beauty salon in Vadodara offering personalized services. Specializing in bridal makeup, hair styling, and skincare treatments with traditional Gujarat touch.',
      ownerId: salonOwner4.id,
      email: 'mehta@beautysalon.com',
      phone: '+912652412349',
      address: '567 Alkapuri, Vadodara',
      city: 'Vadodara',
      state: 'Gujarat',
      pincode: '390007',
      openingTime: '10:00',
      closingTime: '19:00',
      workingDays: [1, 2, 3, 4, 5, 6], // Mon to Sat
      isActive: true,
      isVerified: true,
      acceptsOnlinePayment: false,
      instantBooking: false,
      averageRating: 4.8,
      totalReviews: 156
    }
  });

  const salon6 = await prisma.salon.create({
    data: {
      name: 'Parmar Luxury Salon & Spa',
      slug: 'parmar-luxury-salon-spa',
      description: 'High-end luxury salon and spa in Ahmedabad offering premium beauty treatments. VIP experience with personalized service and luxury products. Gujarat\'s finest beauty destination.',
      ownerId: salonOwner5.id,
      email: 'contact@parmarluxury.com',
      phone: '+912612412350',
      address: '999 Dumas Road, Surat',
      city: 'Surat',
      state: 'Gujarat',
      pincode: '395007',
      openingTime: '09:00',
      closingTime: '21:00',
      workingDays: [1, 2, 3, 4, 5, 6, 0], // All days
      isActive: true,
      isVerified: true,
      acceptsOnlinePayment: true,
      instantBooking: true,
      averageRating: 4.9,
      totalReviews: 312
    }
  });

  const salon7 = await prisma.salon.create({
    data: {
      name: 'Thakor Trendy Cuts',
      slug: 'thakor-trendy-cuts',
      description: 'Trendy and affordable hair salon in Rajkot for young professionals. Latest styles and techniques with friendly atmosphere and Gujarat hospitality.',
      ownerId: salonOwner3.id,
      email: 'hello@thakortrendy.com',
      phone: '+912812412351',
      address: '147 Kalavad Road, Rajkot',
      city: 'Rajkot',
      state: 'Gujarat',
      pincode: '360001',
      openingTime: '11:00',
      closingTime: '20:00',
      workingDays: [1, 2, 3, 4, 5, 6], // Mon to Sat
      isActive: true,
      isVerified: true,
      acceptsOnlinePayment: true,
      instantBooking: true,
      averageRating: 4.1,
      totalReviews: 78
    }
  });

  const salon8 = await prisma.salon.create({
    data: {
      name: 'Chaudhary Elegant Beauty Hub',
      slug: 'chaudhary-elegant-beauty-hub',
      description: 'Elegant beauty hub in Ahmedabad offering comprehensive beauty and wellness services. Professional team with years of experience and traditional Gujarat beauty expertise.',
      ownerId: salonOwner2.id,
      email: 'info@chaudharybeauty.com',
      phone: '+917927412352',
      address: '852 Bodakdev, Ahmedabad',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380054',
      openingTime: '09:00',
      closingTime: '20:00',
      workingDays: [1, 2, 3, 4, 5, 6, 0], // All days
      isActive: true,
      isVerified: true,
      acceptsOnlinePayment: true,
      instantBooking: false,
      averageRating: 4.4,
      totalReviews: 145
    }
  });

  console.log('✂️  Creating services...');

  // Create service categories
  const hairCategory = await prisma.serviceCategory.create({
    data: {
      name: 'Hair Services',
      slug: 'hair-services',
      description: 'Hair cutting, styling, coloring, and treatment services',
      icon: 'scissors'
    }
  });

  const skinCategory = await prisma.serviceCategory.create({
    data: {
      name: 'Skin Care',
      slug: 'skin-care',
      description: 'Facial treatments, skincare, and beauty services',
      icon: 'sparkles'
    }
  });

  const nailCategory = await prisma.serviceCategory.create({
    data: {
      name: 'Nail Care',
      slug: 'nail-care',
      description: 'Manicure, pedicure, and nail art services',
      icon: 'hand'
    }
  });

  const spaCategory = await prisma.serviceCategory.create({
    data: {
      name: 'Spa & Wellness',
      slug: 'spa-wellness',
      description: 'Massage, spa treatments, and wellness services',
      icon: 'spa'
    }
  });

  const makeupCategory = await prisma.serviceCategory.create({
    data: {
      name: 'Makeup & Beauty',
      slug: 'makeup-beauty',
      description: 'Makeup application, beauty treatments, and styling',
      icon: 'palette'
    }
  });

  // Services for salon1 (Style Studio Premium)
  const service1 = await prisma.service.create({
    data: {
      salonId: salon1.id,
      categoryId: hairCategory.id,
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
      categoryId: hairCategory.id,
      name: 'Hair Color',
      description: 'Premium hair coloring service with ammonia-free dyes',
      price: 1200,
      durationMinutes: 90,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 400
    }
  });

  const service3 = await prisma.service.create({
    data: {
      salonId: salon1.id,
      categoryId: hairCategory.id,
      name: 'Beard Grooming',
      description: 'Complete beard trimming and styling service',
      price: 200,
      durationMinutes: 20,
      isActive: true
    }
  });

  const service4 = await prisma.service.create({
    data: {
      salonId: salon1.id,
      categoryId: hairCategory.id,
      name: 'Hair Wash & Blow Dry',
      description: 'Professional hair wash with premium products and blow dry styling',
      price: 400,
      discountPrice: 350,
      durationMinutes: 45,
      isActive: true
    }
  });

  const service5 = await prisma.service.create({
    data: {
      salonId: salon1.id,
      categoryId: hairCategory.id,
      name: 'Keratin Treatment',
      description: 'Advanced keratin treatment for smooth, silky hair',
      price: 2000,
      discountPrice: 1800,
      durationMinutes: 120,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 600
    }
  });

  // Services for salon2 (Beauty Lounge)
  const service6 = await prisma.service.create({
    data: {
      salonId: salon2.id,
      categoryId: hairCategory.id,
      name: "Women's Haircut",
      description: 'Stylish haircut with consultation and blow-dry',
      price: 500,
      discountPrice: 450,
      durationMinutes: 45,
      isActive: true
    }
  });

  const service7 = await prisma.service.create({
    data: {
      salonId: salon2.id,
      categoryId: nailCategory.id,
      name: 'Manicure & Pedicure',
      description: 'Complete nail care package with premium polish',
      price: 800,
      discountPrice: 699,
      durationMinutes: 60,
      isActive: true
    }
  });

  const service8 = await prisma.service.create({
    data: {
      salonId: salon2.id,
      categoryId: skinCategory.id,
      name: 'Facial Treatment',
      description: 'Deep cleansing facial with massage and mask',
      price: 1000,
      durationMinutes: 60,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 300
    }
  });

  const service9 = await prisma.service.create({
    data: {
      salonId: salon2.id,
      categoryId: makeupCategory.id,
      name: 'Bridal Makeup',
      description: 'Complete bridal makeup with trial session',
      price: 2500,
      discountPrice: 2250,
      durationMinutes: 90,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 800
    }
  });

  const service10 = await prisma.service.create({
    data: {
      salonId: salon2.id,
      categoryId: hairCategory.id,
      name: 'Hair Spa Treatment',
      description: 'Relaxing hair spa with hot oil massage and conditioning',
      price: 800,
      discountPrice: 700,
      durationMinutes: 60,
      isActive: true
    }
  });

  // Services for salon3 (Glamour Spa & Salon)
  const service11 = await prisma.service.create({
    data: {
      salonId: salon3.id,
      categoryId: spaCategory.id,
      name: 'Full Body Spa',
      description: 'Relaxing full body spa treatment with aromatherapy',
      price: 2500,
      discountPrice: 2250,
      durationMinutes: 120,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 800
    }
  });

  const service12 = await prisma.service.create({
    data: {
      salonId: salon3.id,
      categoryId: makeupCategory.id,
      name: 'Party Makeup',
      description: 'Trendy party makeup with glitter and special effects',
      price: 1500,
      discountPrice: 1350,
      durationMinutes: 60,
      isActive: true
    }
  });

  const service13 = await prisma.service.create({
    data: {
      salonId: salon3.id,
      categoryId: hairCategory.id,
      name: 'Hair Extensions',
      description: 'Premium hair extensions with natural look guarantee',
      price: 3500,
      discountPrice: 3200,
      durationMinutes: 180,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 1200
    }
  });

  const service14 = await prisma.service.create({
    data: {
      salonId: salon3.id,
      categoryId: skinCategory.id,
      name: 'Anti-Aging Facial',
      description: 'Advanced anti-aging facial with collagen treatment',
      price: 2500,
      discountPrice: 2200,
      durationMinutes: 75,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 800
    }
  });

  // Services for salon4 (Grooming Hub)
  const service15 = await prisma.service.create({
    data: {
      salonId: salon4.id,
      categoryId: hairCategory.id,
      name: 'Executive Haircut',
      description: 'Professional executive haircut with precision styling',
      price: 350,
      discountPrice: 300,
      durationMinutes: 35,
      isActive: true
    }
  });

  const service16 = await prisma.service.create({
    data: {
      salonId: salon4.id,
      categoryId: hairCategory.id,
      name: 'Beard Shaping & Coloring',
      description: 'Complete beard shaping with professional coloring',
      price: 600,
      discountPrice: 550,
      durationMinutes: 40,
      isActive: true
    }
  });

  const service17 = await prisma.service.create({
    data: {
      salonId: salon4.id,
      categoryId: hairCategory.id,
      name: 'Head Massage',
      description: 'Relaxing head massage with essential oils',
      price: 250,
      discountPrice: 200,
      durationMinutes: 20,
      isActive: true
    }
  });

  // Services for salon5 (Beauty Salon by Meera)
  const service18 = await prisma.service.create({
    data: {
      salonId: salon5.id,
      categoryId: makeupCategory.id,
      name: 'Traditional Bridal Makeup',
      description: 'Traditional Indian bridal makeup with gold work',
      price: 5000,
      discountPrice: 4500,
      durationMinutes: 120,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 2000
    }
  });

  const service19 = await prisma.service.create({
    data: {
      salonId: salon5.id,
      categoryId: skinCategory.id,
      name: 'Hydrating Facial',
      description: 'Deep hydrating facial for dry and damaged skin',
      price: 1500,
      discountPrice: 1350,
      durationMinutes: 60,
      isActive: true
    }
  });

  const service20 = await prisma.service.create({
    data: {
      salonId: salon5.id,
      categoryId: hairCategory.id,
      name: 'Updo Styling',
      description: 'Elegant updo styling for special occasions',
      price: 800,
      discountPrice: 700,
      durationMinutes: 45,
      isActive: true
    }
  });

  // Services for salon6 (Luxury Salon & Spa)
  const service21 = await prisma.service.create({
    data: {
      salonId: salon6.id,
      categoryId: spaCategory.id,
      name: 'Couples Massage',
      description: 'Romantic couples massage in private suite',
      price: 6000,
      discountPrice: 5500,
      durationMinutes: 90,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 2000
    }
  });

  const service22 = await prisma.service.create({
    data: {
      salonId: salon6.id,
      categoryId: makeupCategory.id,
      name: 'Celebrity Makeup',
      description: 'High-end celebrity makeup with premium products',
      price: 4000,
      discountPrice: 3600,
      durationMinutes: 75,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 1500
    }
  });

  const service23 = await prisma.service.create({
    data: {
      salonId: salon6.id,
      categoryId: skinCategory.id,
      name: 'Diamond Facial',
      description: 'Luxury diamond facial with gold particles',
      price: 4000,
      discountPrice: 3600,
      durationMinutes: 90,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 1500
    }
  });

  // Services for salon7 (Trendy Cuts)
  const service24 = await prisma.service.create({
    data: {
      salonId: salon7.id,
      categoryId: hairCategory.id,
      name: 'Trendy Youth Cut',
      description: 'Modern trendy haircut for young adults',
      price: 250,
      discountPrice: 200,
      durationMinutes: 25,
      isActive: true
    }
  });

  const service25 = await prisma.service.create({
    data: {
      salonId: salon7.id,
      categoryId: hairCategory.id,
      name: 'Balayage Highlights',
      description: 'Fashionable balayage highlighting technique',
      price: 1800,
      discountPrice: 1600,
      durationMinutes: 120,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 600
    }
  });

  // Services for salon8 (Elegant Beauty Hub)
  const service26 = await prisma.service.create({
    data: {
      salonId: salon8.id,
      categoryId: nailCategory.id,
      name: 'Gel Manicure',
      description: 'Long-lasting gel manicure with chip-resistant polish',
      price: 1000,
      discountPrice: 900,
      durationMinutes: 60,
      isActive: true
    }
  });

  const service27 = await prisma.service.create({
    data: {
      salonId: salon8.id,
      categoryId: skinCategory.id,
      name: 'Oxygen Facial',
      description: 'Oxygen-infused facial for glowing skin',
      price: 2200,
      discountPrice: 2000,
      durationMinutes: 75,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 800
    }
  });

  const service28 = await prisma.service.create({
    data: {
      salonId: salon8.id,
      categoryId: hairCategory.id,
      name: 'Hair Rebonding',
      description: 'Professional hair rebonding for straight, silky hair',
      price: 2800,
      discountPrice: 2500,
      durationMinutes: 180,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 1000
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
  console.log('Admin Users:');
  console.log('Siddharth Sadhu - Email: siddharthsadhu28@gmail.com, Password: Sadhu@2006');
  console.log('Default Admin - Email: admin@bookmylook.com, Password: admin123');
  console.log('\nSalon Owners:');
  console.log('Rajesh Patel - Email: rajesh@patelbeautystudio.com, Password: owner123');
  console.log('Priya Shah - Email: priya@shahbeautylounge.com, Password: owner456');
  console.log('Vikas Joshi - Email: vikas@joshigrooming.com, Password: owner789');
  console.log('Meera Mehta - Email: meera@mehtabeautysalon.com, Password: owner101');
  console.log('Arjun Parmar - Email: arjun@parmarluxury.com, Password: owner202');
  console.log('\nCustomers:');
  console.log('Rahul Patel - Email: rahul@example.com, Password: customer123');
  console.log('Priya Shah - Email: priya@example.com, Password: customer456');
  console.log('================================\n');

  console.log('🏪 Available Salons in Gujarat:');
  console.log('1. Patel Beauty Studio (Ahmedabad) - Premium beauty services');
  console.log('2. Shah Beauty Lounge (Ahmedabad) - Full beauty services');
  console.log('3. Desai Spa & Salon (Gandhinagar) - Luxury spa treatments');
  console.log('4. Joshi Grooming Hub (Ahmedabad) - Men\'s grooming services');
  console.log('5. Mehta Beauty Salon (Vadodara) - Personalized bridal services');
  console.log('6. Parmar Luxury Salon & Spa (Surat) - High-end beauty treatments');
  console.log('7. Thakor Trendy Cuts (Rajkot) - Affordable hair services');
  console.log('8. Chaudhary Elegant Beauty Hub (Ahmedabad) - Comprehensive beauty services');

  console.log('✅ Ready for testing in Gujarat! Visit http://localhost:8080');
}

main()
  .catch((e) => {
    console.error('❌ Database seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
