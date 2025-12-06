# Ananda Central College - School Management System

A comprehensive MERN stack School Management System specifically designed for Sri Lankan schools, following the Ministry of Education standards and local school structure.

## 🎓 Features

### School Structure
- **Grades**: 1 to 13 (Primary, Junior Secondary, O/L, A/L)
- **Sections**: Primary (1-5), Junior Secondary (6-9), O/L Section (10-11), A/L Section (12-13)
- **Medium Support**: Sinhala, Tamil, English
- **A/L Streaming**: Science, Commerce, Arts, Technology

### User Roles
1. **Admin**
   - Manage students, teachers, and parents
   - Assign class teachers and subject teachers
   - Manage classes, subjects, and terms
   - Upload notices and circulars
   - Generate reports

2. **Teacher**
   - Mark attendance (daily and period-wise)
   - Create and grade assignments
   - Enter marks (Term Marks & Final Marks)
   - Publish notices to classes
   - View timetable

3. **Student**
   - View timetable
   - View attendance (monthly & term-based)
   - View marks with Sri Lankan grading (A, B, C, S, F)
   - Submit assignments
   - View notices

4. **Parent**
   - Monitor child attendance
   - View term test results
   - View O/L & A/L mock exam reports
   - Message class teacher
   - View notices

### Core Modules
- ✅ Authentication & Authorization
- ✅ Student Management
- ✅ Teacher Management
- ✅ Class Management
- ✅ Attendance System (Ministry standards)
- ✅ Marks & Grading (Sri Lankan pattern)
- ✅ Assignment Management
- ✅ Notice Board System
- ✅ Term Management (Term 1, 2, 3)
- ✅ Timetable Management
- ✅ Report Card Generation
- ✅ Dashboard Analytics

## 🏗️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Bcrypt for password hashing

### Frontend
- React 18
- Redux Toolkit
- React Router v6
- Tailwind CSS
- Recharts for analytics
- Axios for API calls

## 📁 Project Structure

```
ananda-central-college-sms/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── constants.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── classController.js
│   │   │   ├── attendanceController.js
│   │   │   ├── marksController.js
│   │   │   ├── assignmentController.js
│   │   │   ├── noticeController.js
│   │   │   ├── studentController.js
│   │   │   ├── teacherController.js
│   │   │   └── dashboardController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Class.js
│   │   │   ├── Subject.js
│   │   │   ├── Term.js
│   │   │   ├── Attendance.js
│   │   │   ├── Assignment.js
│   │   │   ├── Submission.js
│   │   │   ├── Marks.js
│   │   │   ├── Notice.js
│   │   │   ├── Timetable.js
│   │   │   ├── SchoolInfo.js
│   │   │   └── Message.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── classRoutes.js
│   │   │   ├── attendanceRoutes.js
│   │   │   ├── marksRoutes.js
│   │   │   ├── assignmentRoutes.js
│   │   │   ├── noticeRoutes.js
│   │   │   ├── studentRoutes.js
│   │   │   ├── teacherRoutes.js
│   │   │   └── dashboardRoutes.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── classService.js
│   │   │   ├── attendanceService.js
│   │   │   ├── marksService.js
│   │   │   ├── assignmentService.js
│   │   │   └── noticeService.js
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout/
│   │   │       ├── Navbar.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   │   └── Login.jsx
│   │   │   └── Dashboard/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── TeacherDashboard.jsx
│   │   │       ├── StudentDashboard.jsx
│   │   │       └── ParentDashboard.jsx
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       ├── studentSlice.js
│   │   │       └── classSlice.js
│   │   ├── lib/
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ananda-central-college
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start MongoDB (if running locally):
```bash
mongod
```

6. Run the backend server:
```bash
npm run dev
```

The backend API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Classes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Create new class (Admin only)
- `GET /api/classes/:id` - Get class details
- `POST /api/classes/add-student` - Add student to class

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student (Admin only)
- `GET /api/students/:id` - Get student details
- `PUT /api/students/:id` - Update student (Admin only)

### Attendance
- `POST /api/attendance` - Mark attendance (Teacher/Admin)
- `POST /api/attendance/bulk` - Mark bulk attendance
- `GET /api/attendance/student/:studentId` - Get student attendance
- `GET /api/attendance/class/:classId` - Get class attendance

### Marks
- `POST /api/marks` - Enter marks (Teacher/Admin)
- `POST /api/marks/bulk` - Enter bulk marks
- `GET /api/marks/student/:studentId` - Get student marks
- `GET /api/marks/report-card/:studentId` - Generate report card

### Assignments
- `GET /api/assignments` - Get assignments
- `POST /api/assignments` - Create assignment (Teacher/Admin)
- `POST /api/assignments/submit` - Submit assignment (Student)
- `POST /api/assignments/grade/:submissionId` - Grade submission

### Notices
- `GET /api/notices` - Get notices
- `POST /api/notices` - Create notice (Admin only)
- `GET /api/notices/:id` - Get notice details

### Dashboard
- `GET /api/dashboard/admin` - Admin dashboard data
- `GET /api/dashboard/teacher` - Teacher dashboard data
- `GET /api/dashboard/student` - Student dashboard data
- `GET /api/dashboard/parent` - Parent dashboard data

## 📊 Sri Lankan School Features

### Grading System
- **A**: 75-100 (Distinction)
- **B**: 65-74 (Very Good)
- **C**: 50-64 (Credit)
- **S**: 35-49 (Satisfactory)
- **F**: 0-34 (Fail)

### Subject Allocation
Subjects are automatically assigned based on grade and stream:
- **Primary (1-5)**: Core subjects + Environmental Studies
- **Junior Secondary (6-9)**: All subjects + ICT
- **O/L (10-11)**: Core subjects + Commerce/Health
- **A/L (12-13)**: Stream-specific subjects

### Term Structure
- **Term 1**: January - April
- **Term 2**: May - August
- **Term 3**: September - December

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication. Tokens are stored in localStorage and automatically included in API requests.

## 🎨 UI/UX

- Modern, responsive design with Tailwind CSS
- Role-based navigation
- Real-time dashboard analytics
- User-friendly forms and data tables

## 📱 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] SMS notifications
- [ ] Email notifications
- [ ] Advanced reporting
- [ ] Fee management
- [ ] Library management
- [ ] Transportation management
- [ ] Parent-teacher messaging system

## 🤝 Contributing

This is a school management system project. Contributions are welcome!

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Ananda Central College - School Management System Development Team

## 📞 Support

For support, email support@ananda-central-college.lk or contact the IT department.

---

**Built with ❤️ for Sri Lankan Schools**
