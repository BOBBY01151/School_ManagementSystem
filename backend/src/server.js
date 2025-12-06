import app from './app.js';
import connectDB from './config/database.js';
import net from 'net';

const PORT = process.env.PORT || 5000;

// Function to check if port is available
const isPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    server.on('error', () => resolve(false));
  });
};

// Function to find available port
const findAvailablePort = async (startPort) => {
  let port = startPort;
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const available = await isPortAvailable(port);
    if (available) {
      return port;
    }
    port++;
    attempts++;
  }
  throw new Error(`Could not find an available port after ${maxAttempts} attempts`);
};

// Start server with port conflict handling
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Find available port
    const availablePort = await findAvailablePort(PORT);
    
    if (availablePort !== PORT) {
      console.log(`⚠️  Port ${PORT} is already in use. Using port ${availablePort} instead.`);
    }

    const server = app.listen(availablePort, () => {
      console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${availablePort}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.log(`Error: ${err.message}`);
      server.close(() => process.exit(1));
    });

    // Handle server errors
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${availablePort} is already in use.`);
        process.exit(1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

