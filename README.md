# Complaint Management System

A full-stack web application for managing and tracking user complaints, built with **React (Vite)** on the frontend and **Express.js with Supabase** on the backend.

## Demo Admin Credentials

To test admin features, use:
- **Email:** admin123@example.com
- **Password:** admin@123

## Features

- Public complaint submission form  
- Admin dashboard for managing complaints
- Secure authentication with Supabase Auth (email/password)
- Backend API protected with JWT and admin role checks
- Real-time data updates  

## Tech Stack

### Frontend

- React (TypeScript)  
- Vite (build tool)  
- TailwindCSS (styling)  
- React Router (navigation)  
- Supabase JS Client (auth & API)

### Backend

- Express.js (API server)  
- Supabase (PostgreSQL + Auth)  
- JWT verification for protected routes  
- CORS enabled for cross-origin requests  

## Setup & Usage

### 1. Environment Variables

**Frontend (.env):**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL= # (leave blank for local dev, set to backend URL in production)
```

**Backend (.env):**
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Running Locally

**Backend:**
```sh
cd backend
npm install
npm run dev
```

**Frontend:**
```sh
cd frontend
npm install
npm run dev
```

### 3. Deployment
- Deploy frontend to Vercel (set env vars in dashboard)
- Deploy backend to Render (set env vars in dashboard)
- Set `VITE_API_URL` in Vercel to your Render backend URL

## Authentication & Admin Access

- Users log in with email/password via Supabase Auth
- Only users with `role: 'admin'` in the `profiles` table can access the admin dashboard and protected API routes
- JWT tokens are used to secure backend admin endpoints
- Public can submit complaints without logging in


