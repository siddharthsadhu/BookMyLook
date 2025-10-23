import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

interface SeedAdminRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export const handleSeedAdmin: RequestHandler = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password }: SeedAdminRequest = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        error: 'First name, last name, email, and password are required'
      });
    }

    // Check if admin already exists
    const existingAdmin = await req.prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      return res.status(400).json({
        error: 'Admin user already exists. Cannot seed another admin.'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    const adminUser = await req.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: true,
        phoneVerified: true,
        isActive: true
      }
    });

    // Remove password from response
    const { password: _, ...adminResponse } = adminUser;

    res.json({
      success: true,
      message: 'Admin user created successfully',
      admin: adminResponse
    });

  } catch (error) {
    console.error('Error seeding admin:', error);

    // Handle unique constraint violations
    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'Email or phone number already exists'
      });
    }

    res.status(500).json({
      error: 'Failed to seed admin user'
    });
  }
};
