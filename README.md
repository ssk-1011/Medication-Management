# Medication Management System

A comprehensive medication tracking application built with React and Node.js, designed to help patients and caretakers manage medication schedules and monitor adherence.

## Features

### Core Functionality
- **User Authentication**: Secure login/signup with SQLite database
- **Role-based Dashboards**: Separate interfaces for patients and caretakers
- **Medication Management**: Complete CRUD operations for medications
- **Adherence Tracking**: Real-time tracking with percentage calculations
- **Calendar Visualization**: Interactive calendar for medication schedules
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Roles
- **Patients**: Track personal medications, view schedules, monitor adherence
- **Caretakers**: Manage multiple patients, monitor compliance, overview dashboard

## Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API requests
- **date-fns** - Date manipulation utilities

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **SQLite3** - Lightweight database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Project Structure

```
medication-management-system/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard/
│   │   │   ├── PatientDashboard.jsx
│   │   │   ├── CaretakerDashboard.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── Medications/
│   │   │   ├── MedicationCard.jsx
│   │   │   ├── AddMedicationModal.jsx
│   │   │   └── CalendarView.jsx
│   │   └── UI/
│   │       ├── StatsCard.jsx
│   │       └── LoadingSpinner.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   ├── authAPI.js
│   │   └── medicationAPI.js
│   ├── tests/
│   │   ├── MedicationCard.test.js
│   │   ├── authAPI.test.js
│   │   └── setup.js
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── database/
│   │   └── init.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── medications.js
│   └── index.js
├── package.json
├── vite.config.js
├── vitest.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional)**
   Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your-secret-key-here
   PORT=3001
   ```

4. **Start the backend server**
   ```bash
   npm run server:dev
   ```
   The server will start on http://localhost:3001

5. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   The application will open at http://localhost:5173

### Database Setup

The SQLite database is automatically initialized when the server starts. It creates three tables:
- `users` - Store user accounts and authentication
- `medications` - Store medication information
- `medication_logs` - Track when medications are taken

## Usage

### Getting Started

1. **Register a new account**
   - Choose between Patient or Caretaker role
   - Fill in your details and create a password

2. **Login to your dashboard**
   - Patients see their medication overview and calendar
   - Caretakers see patient management interface

3. **Add medications** (Patient Dashboard)
   - Click "Add Medication" button
   - Enter medication name, dosage, and frequency
   - Optional: Add notes for special instructions

4. **Track medication intake**
   - Mark medications as taken for today
   - View adherence statistics
   - Use calendar view for schedule overview

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/verify` - Verify JWT token

#### Medications
- `GET /api/medications` - Get user's medications
- `POST /api/medications` - Add new medication
- `PUT /api/medications/:id` - Update medication
- `DELETE /api/medications/:id` - Delete medication
- `POST /api/medications/:id/taken` - Mark as taken
- `GET /api/medications/adherence` - Get adherence stats

## Testing

Run the test suite using Vitest:

```bash
npm run test
```

### Test Coverage
- Component rendering and interaction tests
- API service functionality tests
- Authentication flow tests

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin requests

## Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Efficient Re-renders**: Optimized React component updates
- **Database Indexing**: Optimized queries for user data
- **Responsive Images**: Properly sized assets for different screens

## Development Notes

### Form Validation
All forms include comprehensive validation:
- Required field checking
- Email format validation
- Password strength requirements
- Real-time error feedback

### Loading States
- Skeleton loading for data fetching
- Button disabled states during submission
- Proper error handling and display

### Responsive Design
- Mobile-first approach
- Tailwind CSS breakpoints
- Touch-friendly interface elements

## Future Enhancements

### Phase 2 Features
- Real-time notifications
- Advanced adherence analytics
- Patient-caretaker communication

### Phase 3 Features
- Photo upload for medication proof
- Export/import medication data
- Integration with pharmacy APIs
- Mobile app version

## Troubleshooting

### Common Issues

1. **Server won't start**
   - Check if port 3001 is available
   - Verify Node.js version (v18+)
   - Run `npm install` to ensure all dependencies

2. **Database errors**
   - Delete `server/database/medication_tracker.db` to reset
   - Restart the server to reinitialize

3. **Frontend build issues**
   - Clear node_modules and reinstall
   - Check for TypeScript/JSX syntax issues

### Logging
- Server logs are output to console
- Check browser console for frontend errors
- Database operations are logged in development

## Contributing

1. Follow the existing code structure
2. Write tests for new features
3. Use meaningful commit messages
4. Update documentation as needed

## License

This project is created for educational purposes as part of the Website Learners Assignment.