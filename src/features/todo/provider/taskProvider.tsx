import { createContext, useContext } from "react";
import { useTask } from "../hooks/useTask";
import type { Task } from "../../../types/task";

const TaskContext = createContext<{
    tasks: Task[];
    loading: boolean;
    error: Error | null;
} | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const { tasks, loading, error } = useTask();
    return (
        <TaskContext.Provider value={{ tasks, loading, error }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};