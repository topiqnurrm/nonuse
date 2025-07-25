# 🚗 Fleet Management Dashboard

A comprehensive vehicle tracking system built as a fullstack application for monitoring fleet operations in real-time.

## 📋 Project Overview

This dashboard provides fleet managers with essential tools to monitor vehicle status, track locations, and manage fleet operations efficiently. The system includes authentication, real-time data visualization, and detailed vehicle information management.

## 🏗️ Architecture & Technologies

**Frontend Stack:**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and builds  
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand for lightweight state handling
- **Routing**: React Router for navigation

**Backend Stack:**
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with httpOnly cookies
- **Validation**: Zod for request/response validation

**Infrastructure:**
- **Containerization**: Docker & Docker Compose
- **Database Migrations**: Prisma migrations
- **API Documentation**: Auto-generated OpenAPI docs

## 🎯 Features Implemented

### Core Functionality
- ✅ **Vehicle Fleet Overview** - Display all vehicles with status indicators
- ✅ **Detailed Vehicle Information** - Individual vehicle data including fuel, speed, odometer
- ✅ **Location Tracking** - GPS coordinates for each vehicle
- ✅ **Status Management** - Active/Inactive vehicle states
- ✅ **Responsive Design** - Mobile-friendly interface

### Authentication & Security  
- ✅ **JWT Authentication** - Secure login system
- ✅ **Protected Routes** - Route-level access control
- ✅ **Session Management** - Automatic token refresh
- ✅ **Input Validation** - Server-side data validation

### Technical Excellence
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Clean Architecture** - Organized folder structure
- ✅ **API Documentation** - Interactive API explorer
- ✅ **Database Seeding** - Sample data for testing

## 🚀 Quick Start Guide

### Prerequisites
Ensure you have [Docker](https://docs.docker.com/get-docker/) installed and running on your system.

### Installation Steps

1. **Get the Code**
   ```bash
   git clone https://github.com/topiqnurrm/KnowledgeTest_TaufiqNurrohman
   ```

2. **Launch the Application**
   ```bash
   docker compose up -d --build
   ```

3. **Setup Database**
   ```bash
   # Access backend container
   docker exec -it yumx-vehicle-tracker-backend sh
   
   # Run migrations and seed data
   bun prisma:deploy && bun prisma:seed
   
   # Exit container
   exit
   ```

### Access Points
- **Dashboard**: [http://localhost:3000](http://localhost:3000)
- **API Documentation**: [http://localhost:8080/docs](http://localhost:8080/docs) / https://grateful-contentment-production-c40f.up.railway.app

## 🔐 Login Credentials

For testing purposes, use these credentials:
- **Email**: `admin@gmail.com`
- **Password**: `amanaman123`

## 🗂️ Project Structure

```
├── apps/
│   ├── backend/                 # Express.js API server
│   │   ├── prisma/             # Database schema & migrations
│   │   ├── src/
│   │   │   ├── api/            # Route handlers
│   │   │   │   ├── auth/       # Authentication endpoints
│   │   │   │   └── vehicle/    # Vehicle management endpoints
│   │   │   ├── common/         # Shared utilities
│   │   │   └── config/         # App configuration
│   │   └── Dockerfile
│   └── frontend/               # React application
│       ├── public/
│       │   └── images/         # Vehicle images
│       ├── src/
│       │   ├── components/     # Reusable UI components
│       │   ├── routes/         # Page components
│       │   │   ├── dashboard/  # Vehicle list & details
│       │   │   └── home/       # Authentication pages
│       │   ├── store/          # Zustand state management
│       │   └── lib/            # Utilities & API client
│       └── Dockerfile
└── docker-compose.yml          # Multi-container setup
```

## 🎨 UI Components & Design

The application uses a modern design system built with:
- **shadcn/ui**: High-quality, accessible components
- **Tailwind CSS**: Utility-first styling approach
- **Responsive Layout**: Mobile-first responsive design
- **Dark Mode Ready**: Theme-aware component system

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/login` | User authentication |
| `GET` | `/vehicles` | Retrieve all vehicles |
| `GET` | `/vehicles/:id` | Get specific vehicle details |

## ✅ Assignment Requirements Fulfilled

- ✅ **Functional API**: Complete REST API with proper error handling
- ✅ **React Structure**: Well-organized components with proper state management
- ✅ **Clean Architecture**: Logical folder structure and separation of concerns
- ✅ **Responsive UI**: Mobile-friendly design with excellent UX
- ✅ **Bonus Features**:
  - Full TypeScript implementation
  - JWT authentication with secure cookies
  - Modern Tailwind CSS styling
  - Containerized deployment

## 🛠️ Development Notes

- **State Management**: Zustand provides lightweight, efficient state handling
- **Type Safety**: Comprehensive TypeScript coverage across frontend and backend
- **Database**: PostgreSQL with Prisma for type-safe database operations  
- **Authentication**: Secure JWT implementation with httpOnly cookies
- **Styling**: Component-based design system for consistency

## 📱 Screenshots & Demo

The dashboard features:
- Clean vehicle list with status indicators
- Detailed vehicle cards showing fuel, speed, and location data
- Responsive design that works on all device sizes
- Intuitive navigation between list and detail views
