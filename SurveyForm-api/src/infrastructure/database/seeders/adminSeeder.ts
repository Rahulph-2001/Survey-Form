import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { AdminModel } from '../models/AdminModel';

dotenv.config();

const seedAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is undefined');
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    const username = 'admin';
    const password = 'Admin@1234';

    const existingAdmin = await AdminModel.findOne({ username });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await AdminModel.create({ username, passwordHash });
    
    console.log(`Admin user created! Username: ${username} | Password: ${password}`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedAdmin();
