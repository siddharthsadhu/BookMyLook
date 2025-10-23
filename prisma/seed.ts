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
    await prisma.staffSchedule?.deleteMany({});
    await prisma.staffService?.deleteMany({});
    await prisma.staff?.deleteMany({});
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

  // Create more salon owners
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

  // Additional salon owners
  const owner3Password = await bcrypt.hash('owner789', 10);
  const salonOwner3 = await prisma.user.create({
    data: {
      email: 'vikas@groominghub.com',
      phone: '+919876543216',
      password: owner3Password,
      firstName: 'Vikas',
      lastName: 'Gupta',
      role: 'SALON_OWNER',
      emailVerified: true,
      phoneVerified: true
    }
  });

  const owner4Password = await bcrypt.hash('owner101', 10);
  const salonOwner4 = await prisma.user.create({
    data: {
      email: 'meera@beautysalon.com',
      phone: '+919876543217',
      password: owner4Password,
      firstName: 'Meera',
      lastName: 'Patil',
      role: 'SALON_OWNER',
      emailVerified: true,
      phoneVerified: true
    }
  });

  const owner5Password = await bcrypt.hash('owner202', 10);
  const salonOwner5 = await prisma.user.create({
    data: {
      email: 'arjun@luxurysalon.com',
      phone: '+919876543218',
      password: owner5Password,
      firstName: 'Arjun',
      lastName: 'Verma',
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

  // Additional staff users
  const staff3Password = await bcrypt.hash('staff789', 10);
  const staffUser3 = await prisma.user.create({
    data: {
      email: 'amit@groominghub.com',
      phone: '+919876543219',
      password: staff3Password,
      firstName: 'Amit',
      lastName: 'Sharma',
      role: 'STAFF',
      emailVerified: true
    }
  });

  const staff4Password = await bcrypt.hash('staff101', 10);
  const staffUser4 = await prisma.user.create({
    data: {
      email: 'priya@beautysalon.com',
      phone: '+919876543220',
      password: staff4Password,
      firstName: 'Priya',
      lastName: 'Nair',
      role: 'STAFF',
      emailVerified: true
    }
  });

  const staff5Password = await bcrypt.hash('staff202', 10);
  const staffUser5 = await prisma.user.create({
    data: {
      email: 'suresh@luxurysalon.com',
      phone: '+919876543221',
      password: staff5Password,
      firstName: 'Suresh',
      lastName: 'Rao',
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

  // Additional salons
  const salon4 = await prisma.salon.create({
    data: {
      name: 'Grooming Hub',
      slug: 'grooming-hub',
      description: 'Modern grooming salon specializing in men\'s grooming services. Professional barbers with attention to detail and customer satisfaction.',
      ownerId: salonOwner3.id,
      email: 'info@groominghub.com',
      phone: '+919876543216',
      address: '321 Elite Plaza, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
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
      name: 'Beauty Salon by Meera',
      slug: 'beauty-salon-meera',
      description: 'Intimate beauty salon offering personalized services. Specializing in bridal makeup, hair styling, and skincare treatments.',
      ownerId: salonOwner4.id,
      email: 'meera@beautysalon.com',
      phone: '+919876543217',
      address: '567 Rose Garden, JP Nagar',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560078',
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
      name: 'Luxury Salon & Spa',
      slug: 'luxury-salon-spa',
      description: 'High-end luxury salon and spa offering premium beauty treatments. VIP experience with personalized service and luxury products.',
      ownerId: salonOwner5.id,
      email: 'contact@luxurysalon.com',
      phone: '+919876543218',
      address: '999 Premium Towers, Golf Course Road',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
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
      name: 'Trendy Cuts',
      slug: 'trendy-cuts',
      description: 'Trendy and affordable hair salon for young professionals. Latest styles and techniques with friendly atmosphere.',
      ownerId: salonOwner3.id,
      email: 'hello@trendycuts.com',
      phone: '+919876543228',
      address: '147 Youth Plaza, Lower Parel',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400013',
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
      name: 'Elegant Beauty Hub',
      slug: 'elegant-beauty-hub',
      description: 'Elegant beauty hub offering comprehensive beauty and wellness services. Professional team with years of experience.',
      ownerId: salonOwner2.id,
      email: 'info@elegantbeauty.com',
      phone: '+919876543229',
      address: '852 Diamond Plaza, Rajouri Garden',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110027',
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
      price: 2500,
      discountPrice: 2200,
      durationMinutes: 120,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 800
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
      price: 1200,
      durationMinutes: 60,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 400
    }
  });

  const service9 = await prisma.service.create({
    data: {
      salonId: salon2.id,
      categoryId: makeupCategory.id,
      name: 'Bridal Makeup',
      description: 'Complete bridal makeup with trial session',
      price: 3000,
      discountPrice: 2700,
      durationMinutes: 90,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 1000
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
      price: 3000,
      discountPrice: 2700,
      durationMinutes: 120,
      isActive: true,
      requiresDeposit: true,
      depositAmount: 1000
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
