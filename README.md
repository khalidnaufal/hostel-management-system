# Hostel Management System (HMS)

A modern, production-ready web application for hostel management built with React, Node.js, Express, and Supabase (PostgreSQL).

## Project Structure

- `frontend/` — React application using functional components, hooks, Vite, and React Router.
- `backend/` — Node.js and Express RESTful API, connected to a Supabase (PostgreSQL) database.
- `backend/database.sql` — SQL script to create the required tables in Supabase.

## Tech Stack

- **Frontend**: React, React Router, Vite, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **Auth / Hosting**: Supabase

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-supabase-service-role-key
```

### Frontend (`frontend/.env`)

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Database Setup

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open your project → SQL Editor → New Query.
3. Copy the contents of `backend/database.sql` and click **Run**.
   This will create the `students`, `rooms`, `complaints`, and `payments` tables.

## How to Run

### Prerequisites
- Node.js v18+
- A Supabase project (free tier works fine)

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (see [Environment Variables](#environment-variables) above) and add your Supabase credentials.
4. Start the server:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

### Frontend

1. Navigate to the frontend folder:
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
   The frontend will run on `http://localhost:5173`.

## Login Credentials

> These are hardcoded for demonstration purposes.

- **Username**: `user123`
- **Password**: `impelsys@123`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| POST | `/api/students` | Add a new student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |
| GET | `/api/rooms` | Get all rooms |
| POST | `/api/rooms` | Add a new room |
| PUT | `/api/rooms/:id` | Update a room |
| DELETE | `/api/rooms/:id` | Delete a room |
| GET | `/api/complaints` | Get all complaints |
| POST | `/api/complaints` | Add a new complaint |
| PUT | `/api/complaints/:id` | Update complaint status |
| DELETE | `/api/complaints/:id` | Delete a complaint |
| GET | `/api/payments` | Get all payments |
| POST | `/api/payments` | Record a payment |
| DELETE | `/api/payments/:id` | Delete a payment |



   Login Credentials:
   Username: user123
   Password: impelsys@123
   