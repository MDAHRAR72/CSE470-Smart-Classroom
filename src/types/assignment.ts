export interface Assignment {
  id: string;
  title: string;
  courseName?: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}
