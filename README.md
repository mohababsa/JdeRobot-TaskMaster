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
- 
## Screenshots

Below are key features of TaskMaster:

| Feature | Screenshot |
|---------|------------|
| **Sign Up**<br>Sign-up modal for new users. | ![Sign Up](screenshots/signup.png) |
| **Sign In**<br>Sign-in modal for existing users. | ![Sign In](screenshots/signin.png) |
| **Tasks List with Notifications**<br>Task list showing drag-and-drop and due date notifications. | ![Tasks List](screenshots/tasks-list.png) |
| **Dashboard**<br>Overview of task stats with progress and categories. | ![Dashboard](screenshots/dashboard.png) |
| **Analytics**<br>Charts displaying task completion and distribution. | ![Analytics](screenshots/analytics.png) |
| **Calendar**<br>Calendar view of tasks with due dates. | ![Calendar](screenshots/calendar.png) |

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
6. **Build for Production**:
   ```bash
   npm run build
   npm run preview
   ```
## Firebase and Supabase Usage

### Firebase Authentication
- **Purpose**: Manages user sign-in, sign-up, and profile data (display name, photo URL).
- **Setup**:
  - Initialized in `src/lib/firebase.ts` with `getAuth`.
  - Configured with your Firebase project’s credentials.
- **Features**:
  - **Sign In/Sign Up**: Handled via `SignInModal` and `SignUpModal` using `signInWithEmailAndPassword` and `createUserWithEmailAndPassword`.
  - **Sign Out**: Triggered from `Navbar` with `signOut`, clearing Redux state via `reduxSignOut`.
  - **Profile Updates**: `updateProfile` in `ProfileModal` updates `displayName` and `photoURL`.
- **State Management**: User data is stored in Redux (`authSlice`) and synced with Firebase via `onAuthStateChanged` in `App.tsx`.
- **Verification**: Check user details in Firebase Console > Authentication > Users.

### Supabase Storage
- **Purpose**: Stores profile photos, replacing Firebase Storage to stay within free tier limits.
- **Setup**:
  - Initialized in `src/lib/supabase.ts` with `createClient`.
  - Bucket: `profile_photos` created in Supabase Dashboard.
- **Features**:
  - **Photo Upload**: In `ProfileModal`, photos are uploaded to `profile_photos/<uid>/<filename>` using `supabase.storage.from('profile_photos').upload`.
  - **URL Retrieval**: Public URLs are fetched with `getPublicUrl` and saved to Firebase Auth’s `photoURL`.
- **Policies**: Default authenticated upload policy with a custom rule ensuring users only upload to their UID folder:
  ```sql
  allow authenticated users to upload:
  (auth.uid() = split_part(name, '/', 1))
  ```
  Verification: Check uploaded files in Supabase Dashboard > Storage > profile_photos
## Author
**Mohamed ABABSA** - GSoC 2025 Applicant


