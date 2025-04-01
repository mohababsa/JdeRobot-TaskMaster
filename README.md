# TaskMaster - GSoC 2025 JdeRobot React Challenge

## Overview
TaskMaster is a feature-rich task management application developed as part of the GSoC 2025 application for JdeRobot. Built with React, Redux, and Vite, it extends a basic task manager with advanced functionalities like task filtering, categorization, prioritization, search, drag-and-drop reordering, due dates with notifications, and a sleek UI with dark/light mode support. It integrates Firebase for authentication and Supabase for file storage, offering a robust and modern user experience.

## Features
- **Task Management**: Add, remove, and toggle task completion with a clean interface.
- **Filtering**: Filter tasks by status (all, active, completed, due soon), category, and priority.
- **Categories**: Assign tasks to categories (personal, work, groceries, health, finance) with filtering support.
- **Priorities**: Set task priority (high, medium, low) with visual indicators and sorting.
- **Search**: Search tasks by title in real-time.
- **Drag-and-Drop**: Reorder tasks using React DnD for seamless task organization.
- **Due Dates**: Set due dates with `react-datepicker`, highlighting tasks due within 24 hours with notifications.
- **Dashboard**: Visualize task stats (total, completed, due soon) with a progress bar and category breakdown.
- **Analytics**: View task completion and distribution with bar and pie charts (`react-chartjs-2`).
- **Calendar**: Display tasks with due dates in a calendar view (`react-big-calendar`).
- **Authentication**: User sign-in/sign-up via Firebase Authentication with email/password.
- **Profile Management**: Edit user profile (name, photo) with photo uploads to Supabase Storage (work in progress).
- **UI Enhancements**: Dark/light mode toggle, sidebar with icons, and animations via Framer Motion.
- **Responsive Design**: Fully responsive across mobile and desktop devices.

## Implementation Details
- **Language**: TypeScript with React
- **Libraries**:
  - `react`, `react-dom`: UI components
  - `@reduxjs/toolkit`, `react-redux`: State management
  - `react-dnd`, `react-dnd-html5-backend`: Drag-and-drop functionality
  - `react-datepicker`: Due date selection
  - `react-big-calendar`: Calendar view
  - `react-chartjs-2`, `chart.js`: Analytics charts
  - `firebase`: Authentication
  - `@supabase/supabase-js`: File storage for profile photos
  - `framer-motion`: Animations
  - `tailwindcss`: Styling
  - `uuid`: Unique task IDs
  - `@heroicons/react`: Icons for sidebar
- **Structure**: Modular components (`Navbar`, `TaskForm`, `TaskList`, `TaskFilters`, `SearchBar`, `Dashboard`, `Analytics`, `Calendar`, `ProfileModal`) with Redux slices (`tasksSlice`, `authSlice`).
- **Bundler**: Vite (see justification below)

## Why Vite Instead of Webpack?
While the challenge suggested Webpack, I opted for Vite due to:
- **Speed**: Native ES modules and instant HMR make development faster than Webpack’s rebuilds.
- **Simplicity**: Minimal configuration compared to Webpack’s complexity for TypeScript and React.
- **Modernity**: Aligns with current tooling trends, integrating seamlessly with Tailwind and TypeScript.
- **Efficiency**: Rollup-based production builds are lightweight and optimized.

Vite’s advantages made it ideal for rapid prototyping within the GSoC timeline, though Webpack remains viable for larger-scale projects.

## Prerequisites
- Node.js (v22.14.0)
- npm (v11.2.0)
- Firebase project (for authentication)
- Supabase project (for storage)

## Setup and Running
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mohababsa/JdeRobot-TaskMaster.git
   cd JdeRobot-TaskMaster
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Firebase**:
   - Create a Firebase project at [console firebase](console.firebase.google.com).
   - Enable Email/Password authentication in Authentication > Sign-in method.
   - Copy your Firebase config from Project Settings > General > Your apps > Firebase SDK snippet.
   - Add it to `src/lib/firebase.ts`:
     ```bash
     const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id",
     };
     ```
4. **Configure Supabase**:
   - Create a Supabase project at [supabase](supabase.com).
   - Create a bucket named profile_photos in Storage.
   - Copy your Supabase URL and Anon Key from Settings > API.
   - Add them to `src/lib/supabase.ts`:
     ```bash
     const supabaseUrl = 'https://your-project-id.supabase.co';
     const supabaseAnonKey = 'your-anon-key';
     export const supabase = createClient(supabaseUrl, supabaseAnonKey);
     ```
5. **Run the Application**:
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173`
4. **Build for Production**:
   ```bash
   npm run build
   npm run preview
   ```
5. **Dependencies**:
  - Core: `react`, `react-dom`, `react-redux`, `@reduxjs/toolkit`
  - Features: `react-dnd`, `react-dnd-html5-backend`, `react-datepicker`, `uuid`
  - Styling: `tailwindcss`, `framer-motion` 
  - Dev Tools: `vite`, `typescript`, `eslint`, etc.
## Author
**Mohamed ABABSA** - GSoC 2025 Applicant


