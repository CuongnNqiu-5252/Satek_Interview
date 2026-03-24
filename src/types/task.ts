export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date;
  status: TaskStatus;
  deadline: Date;
  isNotified: boolean;
}

export type TaskStatus = "todo" | "inprogress" | "done";