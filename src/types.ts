export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  userId: string;
  category: 'personal' | 'work' | 'groceries' | 'health' | 'finance'; // Add if not present
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