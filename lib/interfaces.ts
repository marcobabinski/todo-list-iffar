export interface BoardWithTasks {
  id: number;
  title: string;
  tasks: Task[];
  members: {
    id: number;
    is_owner: boolean;
    userId: number;
    boardId: number;
    user: {
      id: number;
      name: string;
      email: string;
    };
  }[];
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  priority: number;
  finished: boolean;
  created_at: Date;
  boardId: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
