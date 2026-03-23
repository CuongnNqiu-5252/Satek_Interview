import { useEffect, useRef, useState } from "react";
import type { Task } from "../types/task"
import { cn } from "../lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CheckCircle2, Circle, Trash2, Badge, CalendarIcon } from "lucide-react";
import type { Button } from "./ui/button";
import customParseFormat from "dayjs/plugin/customParseFormat"
import dayjs from "dayjs"
import StatCards from "./statCards";
import AddTask from "./add-task-dialog";
import { getTasks } from "../features/todo/services/taskService";
import TaskCardChild from "./todoCard/taskCard";
dayjs.extend(customParseFormat)


export default function TaskCard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Design new homepage",
      status: "todo",
      created_at: new Date(),
      deadline: dayjs("2024-07-15", "YYYY-MM-DD").toDate(),
      completed: false,
    },
    {
      id: 2,
      title: "Fix login bug",
      status: "inprogress",
      created_at: new Date(),
      deadline: dayjs("2024-07-10", "YYYY-MM-DD").toDate(),
      completed: false,
    },
    {
      id: 3,
      title: "Update user profile page",
      status: "done",
      created_at: new Date(),
      deadline: dayjs("2024-07-05", "YYYY-MM-DD").toDate(),
      completed: true,
    },
  ]);
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    }
    fetchTasks();
    return () => {
      setTasks([]);
    }
  }, [])
  const onAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };
  const [filterPriority, setFilterPriority] = useState("all");
  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
    overdue: tasks.filter((task) => task.deadline && task.deadline < new Date() && !task.completed).length,
  };
  let showAddForm = useRef(false);
  const filteredtasks = tasks.filter((task: Task) => {
    if (filterPriority === "all") return true;
    return task.status === filterPriority;
  });

  return (
    <main className="flex-1 p-6">
      <StatCards stats={stats}></StatCards>
      <div className={cn("lg:col-span-2", !showAddForm && "lg:col-span-3")}>
        <Card className="bg-white/90 h-full backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2 ml-auto">
                <AddTask onAdd={onAddTask}></AddTask>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-32 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tasks</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredtasks.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-600 mb-2">No tasks found</h3>
                  <p className="text-slate-500">Try adjusting your filters or add a new task</p>
                </div>
              ) : (
                filteredtasks.map((task) => (
                  <TaskCardChild key={task.id} task={task}></TaskCardChild>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}