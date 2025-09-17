# CodeTrack Clone - Full Stack DSA Practice Platform

A full-stack web application that replicates CodeTrack's interface for practicing Data Structures and Algorithms problems. Built with React + TypeScript frontend and Node.js + Express + MongoDB backend.

## 🌟 Features

- **Freemium Model**: 5 free problems in Arrays & Hashing and Two Pointers categories
- **Pro Access (No Payments in Demo)**: Unlock all problems via server-side pro flag (no Stripe)
- **User Authentication**: JWT-based login/register system
- **Problem Tracking**: Mark problems as solved, star favorites
- **18 DSA Categories**: Comprehensive coverage of algorithm topics
- **Responsive Design**: Mobile-friendly CodeTrack-inspired interface
- **MongoDB Database**: Scalable data storage for users and problems

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   Create `.env` file with:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/CodeTrack-clone
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB:**
   ```bash
   # If using local MongoDB
   sudo systemctl start mongod
   ```

5. **Seed the database:**
   ```bash
   npm run seed
   ```

6. **Start the backend server:**
   ```bash
   npm run dev
   ```

   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   ```

4. **Start the frontend server:**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

## 🎯 Free vs Pro Features

### Free Account
- ✅ Access to Arrays & Hashing (5 problems)
- ✅ Access to Two Pointers (5 problems)
- ✅ Problem tracking and starring
- ✅ Progress statistics

### Pro Account (Demo)
- ✅ All free features
- ✅ Access to all 18 categories
- ✅ All coding problems
- ✅ Video explanations

Note: Payments are disabled in this demo. Pro can be toggled via the backend `updateProStatus` endpoint.

## 🛠️ Technologies

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS
**Backend:** Node.js, Express, MongoDB, JWT Authentication
