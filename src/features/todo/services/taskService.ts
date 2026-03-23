import { supabase } from "../../../lib/supabase";
import type { Task } from "../../../types/task";

export const getTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase.from("todos").select("*");

  if (error) throw error;
  return data;
};

export const addTask = async (task: Partial<Task>) => {
  const { data, error } = await supabase
    .from("todos")
    .insert([task])
    .select();

  if (error) throw error;
  return data[0];
};

export const updateTask = async (task: Task) => {
  const { error } = await supabase
    .from("todos")
    .update(task)
    .eq("id", task.id);

  if (error) throw error;
};

export const deleteTask = async (id: number) => {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) throw error;
};