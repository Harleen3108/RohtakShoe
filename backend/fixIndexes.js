import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixIndexes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('products');

    // Get all indexes
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes);

    // Drop the problematic productId index if it exists
    try {
      await collection.dropIndex('productId_1');
      console.log('✅ Dropped productId_1 index');
    } catch (error) {
      console.log('productId_1 index does not exist or already dropped');
    }

    // List indexes after dropping
    const newIndexes = await collection.indexes();
    console.log('Indexes after fix:', newIndexes);

    console.log('✅ Index fix completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing indexes:', error);
    process.exit(1);
  }
};

fixIndexes();
