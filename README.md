# Complaint Management System

A full-stack web application for managing and tracking user complaints, built with **React (Vite)** on the frontend and **Express.js with Supabase** on the backend.

## Features

-  Public complaint submission form  
-  Admin dashboard for managing complaints
-  Secure authentication system  
-  Real-time data updates  

## Tech Stack

### Frontend

- React (TypeScript)  
- Vite (build tool)  
- TailwindCSS (styling)  
- React Router (navigation)  

### Backend

- Express.js (API server)  
- Supabase (PostgreSQL + Auth)  
- CORS enabled for cross-origin requests  

## Setup & Installation

### Prerequisites

- Node.js
- npm or yarn  
- Supabase account and project  

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following:
   ```env
   PORT=3001
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_service_role_secret_key
   ```

4. Start the backend:
   ```bash
   npm run dev
   ```

   Backend will run at: **http://localhost:3001**

### Frontend Setup

1. Navigate to the client folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

4. Start the frontend:
   ```bash
   npm run dev
   ```

   Frontend will run at: **http://localhost:5173**

## Assumptions & Tradeoffs

### Assumptions

- Single admin user system (could be expanded for multiple roles)  
- All complaints are stored in a single table  

### Tradeoffs

**Simplicity vs. Features**  
- Focused on core functionality over additional features  
- Basic authentication for quick development  
- Simple data model for rapid prototyping  

**Development Speed vs. Scalability**  
- Used Supabase for quick database setup  
- CORS configured with wildcard for development ease  
- Basic error handling implemented  

**User Experience vs. Development Time**  
- Minimal UI/UX features  
- Basic form validation  
- Limited filtering and sorting options  

## Future Improvements


### Feature Additions

- Email notifications for new complaints  
- Advanced filtering and search  
- Complaint status tracking  
- Multiple admin roles and permissions  

### Technical Improvements

- Add comprehensive test coverage  
- Implement proper error boundary components  
- Add request caching  

### UI/UX Improvements

- Add mobile-optimized views  
- Enhance accessibility features  
- Style better user-interface
