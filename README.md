<<<<<<< HEAD

# ルックミール (Look Meal) Admin Dashboard

![ルックミール Logo]
=======
# ルックミール (Look Meal) Admin Dashboard


>>>>>>> 56a62b5be3876cbe2b7dd6c8a38da7af4f318cb1

A comprehensive admin dashboard for the ルックミール (Look Meal) platform, featuring user management, analytics, and administrative tools. Built with React, Node.js, and MongoDB.

## Features

### Authentication & Security
- **JWT Authentication** with access tokens and refresh tokens for secure session management
- **Password Encryption** using bcrypt for secure storage
- **Private Routes** to protect authenticated content
- **Role-Based Access Control** for admin and user permissions

### User Management
- **User Registration** with email verification
- **Login System** with secure authentication
<<<<<<< HEAD
- **Password Reset** functionality with email verification
- **User Profile Management** with editable fields
- **User Listing** with filtering, sorting, and pagination

### Email Functionality
- **Password Reset Emails** with secure tokens stored in the dataBase

### UI/UX
- **Responsive Design** for all device sizes
=======
- **Password Reset** 
- **User Profile Management** with editable fields
- **Real User Listing** with filtering, sorting, and pagination - not dummy data but actual user registrations

### Email Functionality
- **Password Reset Emails** with secure tokens stored in the database
- **Email Verification** for new user registrations

### Analytics & Reporting
- **User Demographics** visualization with age and gender distribution based on real registration data
- **Registration Trends** with time-based analytics
- **User Activity Metrics** for engagement analysis

### UI/UX
- **Responsive Design** for all device sizes
- **Custom Tailwind Theme** with Japanese-inspired design elements
>>>>>>> 56a62b5be3876cbe2b7dd6c8a38da7af4f318cb1
- **Reusable Components** for consistent UI across the application
- **Interactive Charts** for data visualization
- **Toast Notifications** for user feedback
- **Form Validation** with helpful error messages

<<<<<<< HEAD
=======
## Real-World Data Collection

The application features a carefully designed registration process that collects realistic user data:

- **Japanese-Specific Fields**: The registration form includes fields specific to Japanese users, such as proper formatting for addresses and names
- **Culturally Appropriate Options**: Gender selection includes options common in Japanese forms (男性, 女性, その他, 回答しない)
- **Date Formatting**: Birth dates are collected in Japanese format (YYYY年 MM月)
- **Location Data**: User locations are collected to provide meaningful geographic distribution analytics
- **Registration Timestamps**: All registrations include proper timestamps in Japanese format

This approach ensures that the user listing and analytics display authentic data patterns rather than randomly generated information, making the dashboard a true representation of the user base.

>>>>>>> 56a62b5be3876cbe2b7dd6c8a38da7af4f318cb1
## Technologies Used

### Frontend
- React.js
- React Router for navigation
- Redux for state management
- Formik & Yup for form validation
- Recharts for data visualization
<<<<<<< HEAD
- Tailwind CSS for styling
=======
- Tailwind CSS v3 for styling
>>>>>>> 56a62b5be3876cbe2b7dd6c8a38da7af4f318cb1
- Lucide React for icons
- Sonner for toast notifications

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email functionality
- Bcrypt for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
<<<<<<< HEAD
- npm or yarn
- Tailwind v.3
=======
- npm 
- Tailwind CSS v3
>>>>>>> 56a62b5be3876cbe2b7dd6c8a38da7af4f318cb1

### Setup

