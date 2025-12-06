# Setup Guide - Ananda Central College SMS

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Initial Data Setup

### Creating Subjects

You'll need to seed the database with Sri Lankan subjects. Create a seed script or manually add subjects through the API.

### Creating First Admin User

Use the registration endpoint to create your first admin user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ananda.lk",
    "password": "admin123",
    "role": "admin",
    "name": "Administrator"
  }'
```

### Creating Teachers

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@ananda.lk",
    "password": "teacher123",
    "role": "teacher",
    "name": "John Teacher",
    "employeeId": "EMP001",
    "nic": "123456789V",
    "phone": "0712345678"
  }'
```

### Creating Students

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@ananda.lk",
    "password": "student123",
    "role": "student",
    "name": "Jane Student",
    "admissionNumber": "ADM001",
    "dateOfBirth": "2010-01-01",
    "gender": "Female",
    "grade": 10,
    "medium": "English",
    "address": "123 Main St"
  }'
```

## MongoDB Setup

### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Update `.env` with: `MONGODB_URI=mongodb://localhost:27017/ananda-central-college`

### MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` with your connection string

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

## Testing the API

Use Postman or curl to test endpoints:

1. **Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@ananda.lk", "password": "admin123"}'
```

2. **Get Dashboard (use token from login):**
```bash
curl -X GET http://localhost:5000/api/dashboard/admin \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Check if port 5000 is available

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in `backend/src/app.js`
- Verify proxy configuration in `frontend/vite.config.js`

### Authentication issues
- Verify JWT_SECRET is set in `.env`
- Check token expiration
- Clear localStorage and login again

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a secure `JWT_SECRET`
3. Enable HTTPS
4. Set up proper MongoDB authentication
5. Configure CORS for your domain
6. Build frontend: `cd frontend && npm run build`
7. Serve frontend build with nginx or similar

