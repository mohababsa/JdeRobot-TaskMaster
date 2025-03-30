# GSoC 2025 - JdeRobot React Challenge: Task Management Application

## Overview
This project is a task management application developed as part of the GSoC 2025 application for JdeRobot. It extends a basic task management app with advanced features using React, Redux, and Vite. The app allows users to manage tasks efficiently with filtering, categorization, prioritization, search and drag-and-drop reordering.

## Implementation Details
- **Language**: TypeScript with React
- **Libraries**:
  - React (UI)
  - Redux Toolkit (state management)
  - React DnD (drag-and-drop)
  - React Datepicker (due dates)
  - Tailwind CSS (styling)
  - UUID (unique task IDs)
  - Framer Motion (animations)
- **Structure**: Modular React components (`Navbar`, `Footer`, `TaskForm`, `TaskList`, `TaskFilters`, `SearchBar`) with Redux slices (`tasksSlice`, `filtersSlice`)
- **Features**:
  - Add, remove, and toggle task completion
  - Filter tasks by status (all, completed, incomplete), category, and priority
  - Categorize tasks (personal, work, groceries, health, finance)
  - Set task priorities (high, medium, low) with visual indicators
  - Search tasks by title
  - Reorder tasks via drag-and-drop
  - Set due dates with notifications for tasks due within 24 hours
  - Dark/light mode toggle with animations
- **Bundler**: Vite (see justification below)

## Why Vite Instead of Webpack?
The challenge suggests Webpack, but I chose Vite for the following reasons:
- **Faster Development**: Vite leverages native ES modules and provides instant hot module replacement (HMR), significantly speeding up development compared to Webpack’s slower rebuilds.
- **Simpler Configuration**: Vite requires minimal setup out of the box, reducing complexity for a project of this scope, whereas Webpack often needs extensive configuration for TypeScript, React, and CSS.
- **Modern Ecosystem**: Vite aligns with modern JavaScript tooling trends, offering better performance for small-to-medium apps like this one, and integrates seamlessly with Tailwind and TypeScript.
- **Production Efficiency**: Vite uses Rollup under the hood for production builds, producing optimized bundles with a smaller footprint than Webpack’s default output.

While Webpack is robust for large-scale apps, Vite’s speed and simplicity made it a better fit for rapid prototyping and development within the GSoC timeline.

## How to Run
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mohababsa/taskmaster.git
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Application**:
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


