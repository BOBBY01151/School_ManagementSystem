# MongoDB Connection Setup

## Your MongoDB Connection String
```
mongodb+srv://vibuproduction_db_user:LQvTL7aCqJE3vI4Y@cluster0.b4ubdgn.mongodb.net/?appName=Cluster0
```

## Steps to Fix

1. **Open or create `backend/.env` file**

2. **Add/Update the MONGODB_URI with the correct format:**

The connection string needs a database name. Use this format:

```env
PORT=5000
MONGODB_URI=mongodb+srv://vibuproduction_db_user:LQvTL7aCqJE3vI4Y@cluster0.b4ubdgn.mongodb.net/ananda-central-college?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-characters
JWT_EXPIRE=7d
NODE_ENV=development
```

**Important Notes:**
- Database name `ananda-central-college` has been added after `.net/`
- Added connection parameters `?retryWrites=true&w=majority` for better reliability
- Make sure there are NO spaces around the `=` sign
- Make sure there are NO quotes around the values

3. **Verify MongoDB Atlas Settings:**
   - Go to MongoDB Atlas dashboard
   - Check Network Access: Ensure your IP is whitelisted (or use 0.0.0.0/0 for all IPs during development)
   - Check Database Access: User `vibuproduction_db_user` should have read/write permissions

4. **Restart your server:**
```bash
npm run dev
```

## Quick Fix Command (if you want to create the file directly)

Run this in your terminal from the `backend` directory:

```bash
cat > .env << 'EOF'
PORT=5000
MONGODB_URI=mongodb+srv://vibuproduction_db_user:LQvTL7aCqJE3vI4Y@cluster0.b4ubdgn.mongodb.net/ananda-central-college?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-characters
JWT_EXPIRE=7d
NODE_ENV=development
EOF
```

