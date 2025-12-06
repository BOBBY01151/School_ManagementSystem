import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if MongoDB URI is provided
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Log connection attempt (without credentials)
    const uriParts = process.env.MONGODB_URI.split('@');
    const displayUri = uriParts.length > 1 ? `mongodb+srv://...@${uriParts[1]}` : process.env.MONGODB_URI;
    console.log(`Attempting to connect to MongoDB: ${displayUri}`);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    // Provide helpful error messages
    if (error.message.includes('ENOTFOUND') || error.message.includes('querySrv')) {
      console.error('\n💡 Troubleshooting tips:');
      console.error('1. Check your internet connection');
      console.error('2. Verify your MongoDB Atlas cluster is running');
      console.error('3. Check if your IP address is whitelisted in MongoDB Atlas');
      console.error('4. Verify the connection string format in your .env file');
      console.error('5. Ensure the database name is correct');
    }
    
    process.exit(1);
  }
};

export default connectDB;

