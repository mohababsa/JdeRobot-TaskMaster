export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: 'personal' | 'work' | 'groceries' | 'health' | 'finance'; // Narrowed from string
  priority: 'high' | 'medium' | 'low';
  dueDate: Date | null;
  createdAt: string;
}

export interface TasksState {
  tasks: Task[];
  notifications: string[];
}

export interface FiltersState {
  status: 'all' | 'completed' | 'incomplete';
  category: 'all' | 'personal' | 'work' | 'groceries' | 'health' | 'finance'; // Updated to match
  priority: string;
  searchTerm: string;
}

export type FilterType = 'all' | 'completed' | 'incomplete';