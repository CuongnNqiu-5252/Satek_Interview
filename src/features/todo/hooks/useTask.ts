import { useEffect, useState } from "react";
import * as taskService from "../services/taskService";
import type { Task } from "../../../types/task";

export const useTask = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await taskService.getTasks();
                setTasks(tasks);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);
    const addTask = async (task: Task) => {
        try {
            const newTask = await taskService.addTask(task);
            setTasks([...tasks, newTask]);
        } catch (error) {
            setError(error as Error);
        }
    };
    const updateTask = async (task: Task) => {
        try {
            await taskService.updateTask(task);
            setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
        } catch (error) {
            setError(error as Error);
        }
    };
    const deleteTask = async (id: number) => {
        try {
            await taskService.deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            setError(error as Error);
        }
    };
    return { tasks, loading, error, addTask, updateTask, deleteTask };
}