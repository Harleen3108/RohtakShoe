import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@producthub.com' });
    if (existingAdmin) {
      console.log('Admin already exists!');
      console.log('Email: admin@producthub.com');
      console.log('Password: admin123');
      process.exit(0);
    }

    // Create new admin
    const admin = await Admin.create({
      email: 'admin@producthub.com',
      password: 'admin123'
    });

    console.log('✅ Admin created successfully!');
    console.log('Email: admin@producthub.com');
    console.log('Password: admin123');
    console.log('\nYou can now login at http://localhost:5174/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
