import type { Task } from "../../../types/task";


export const getTasks = async (): Promise<Task[]> => {
  const data = localStorage.getItem("Task");
  if (!data) return [];
  try {
    const tasks = JSON.parse(data);
    return tasks.map((t: any) => ({
      ...t,
      created_at: t.created_at ? new Date(t.created_at) : new Date(),
      deadline: t.deadline ? new Date(t.deadline) : new Date(),
    })) as Task[];
  } catch (error) {
    console.error("Failed to parse tasks from local storage", error);
    return [];
  }
};

export const addTask = async (task: Partial<Task>): Promise<Task> => {
  const tasks = await getTasks();
  const newTask: Task = {
    ...task,
    id: Date.now(),
    status: task.status || "todo",
    completed: task.completed || false,
    title: task.title || "",
    created_at: task.created_at || new Date(),
    deadline: task.deadline || new Date(),
    isNotified: false,
  } as Task;

  tasks.push(newTask);
  localStorage.setItem("Task", JSON.stringify(tasks));
  return newTask;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const tasks = await getTasks();
  const index = tasks.findIndex((t) => t.id === task.id);
  if (index === -1) {
    throw new Error("Task not found");
  }

  tasks[index] = { ...tasks[index], ...task };
  localStorage.setItem("Task", JSON.stringify(tasks));

  return tasks[index];
};

export const deleteTask = async (id: number): Promise<void> => {
  const tasks = await getTasks();
  const updatedTasks = tasks.filter((t) => t.id !== id);
  localStorage.setItem("Task", JSON.stringify(updatedTasks));
};

export const isNearDeadline = (task: Task): boolean => {
  const now = new Date()
  const diff = new Date(task.deadline).getTime() - now.getTime()
  const hours = diff / (1000 * 60 * 60)
  console.log("task", task);
  console.log("hours", hours);
  console.log("task.status", task.status);
  console.log("task.isNotified", task.isNotified);
  if (hours > 0 && hours <= 24 && task.status.toString() !== "done" && !task.isNotified) {
    return true;
  }
  return false;
};

