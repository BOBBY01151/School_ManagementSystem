import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Admin } from '../models/User.js';

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@ananda.lk' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists with email: admin@ananda.lk');
      console.log('   Password: admin123');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create admin user
    const admin = await Admin.create({
      email: 'admin@ananda.lk',
      password: 'admin123',
      name: 'System Administrator'
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n📧 Login Credentials:');
    console.log('   Email: admin@ananda.lk');
    console.log('   Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedAdmin();

