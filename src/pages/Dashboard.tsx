import { useEffect, useMemo, useState } from "react"
import { Plus, ListFilter, Search } from "lucide-react"
import { useTaskContext } from "../features/todo/provider/taskProvider"
import type { Task } from "../types/task"
import TaskList from "../components/todoCard/taskList"
import TaskDialog from "../components/TaskDialog"
import StatCards from "../components/statCards"
import { addTask, deleteTask, getTasks, isNearDeadline, updateTask } from "../features/todo/services/taskService"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import type { Notification } from "../types/notification"
import { createNotificationsByTasks, getNotifications } from "../features/todo/services/notificationService"
import NotificationList from "../components/notifications/notificationList"
import { Bounce, toast, ToastContainer } from "react-toastify"
import Toastx from "../components/ui/toast"
import { toast as toastx } from "react-hot-toast"
const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "todo", label: "To Do" },
  { value: "inprogress", label: "In Progress" },
  { value: "done", label: "Done" },
]

export default function Dashboard() {
  const { tasks, loading, error } = useTaskContext()
  const [currenttasks, setCurrentTasks] = useState<Task[]>(tasks)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  const fetchCurrtentTask = () => {
    setCurrentTasks(tasks)
  }

  const checkTaskNearDeadline = async () => {
    const taskNotifications: Task[] = await getTasks()
    const taskNearDeadlines: Task[] = taskNotifications.filter((t: Task) => isNearDeadline(t))
    taskNearDeadlines.forEach((t: Task) => {
      updateTask({ ...t, isNotified: true })
      toastx(`⚠️ ${t.title} is near deadline`)

    })
    setNotifications(createNotificationsByTasks(taskNearDeadlines));
  }
  const fetchNotifications = async () => {
    const notifications = await getNotifications()
    setNotifications(notifications)
  }
  useEffect(() => {
    const interval = setInterval(() => {
      checkTaskNearDeadline()
    }, 6000)
    return () => clearInterval(interval)
  }, [tasks])
  useEffect(() => {

    fetchCurrtentTask()
    const taskNearDeadlines: Task[] = tasks.filter((t) => isNearDeadline(t))
    taskNearDeadlines.forEach((t) => {
      updateTask({ ...t, isNotified: true })
    })
    return () => {
      setCurrentTasks([])
    }
  }, [tasks])
  useEffect(() => {
    fetchNotifications()
  }, [])
  const onSearchChange = (query: string) => {
    setSearchQuery(query)
  }
  const filteredTasks = useMemo(() => {
    if (searchQuery == "") {
      return currenttasks
    }
    return currenttasks.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [currenttasks, searchQuery])
  const stats = {
    total: currenttasks.length,
    completed: currenttasks.filter((t) => t.status === "done").length,
    pending: currenttasks.filter((t) => t.status !== "done").length,
    overdue: currenttasks.filter(
      (t) => t.deadline && new Date(t.deadline) < new Date() && t.status !== "done"
    ).length,
  }

  const filtered = filter === "all" ? filteredTasks : filteredTasks.filter((t) => t.status === filter)

  const handleOpenAdd = () => {
    setEditingTask(null)
    setDialogMode("add")
    setDialogOpen(true)
  }

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task)
    setDialogMode("edit")
    setDialogOpen(true)
  }

  const handleMarkDone = async (task: Task) => {
    if (task.status === "done") return
    const newTask: Task = await updateTask({ ...task, status: "done", completed: true })
    setCurrentTasks(currenttasks.map((t) => (t.id === task.id ? newTask : t)))
  }

  const handleDelete = async (id: number) => {
    await deleteTask(id)
    setCurrentTasks(currenttasks.filter((t) => t.id !== id))
  }

  const handleSave = async (data: {
    title: string
    status: Task["status"]
    deadline?: Date
  }) => {
    if (dialogMode === "add") {
      const newTask = await addTask({
        title: data.title,
        status: data.status,
        completed: data.status === "done",
        created_at: new Date(),
        deadline: data.deadline ?? new Date(),
      })
      toast.success('Task added successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setCurrentTasks([...currenttasks, newTask])
    } else if (editingTask) {
      const newTask = await updateTask({
        ...editingTask,
        title: data.title,
        status: data.status,
        completed: data.status === "done",
        deadline: data.deadline ?? editingTask.deadline,
      })
      toast.success('Task updated successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setCurrentTasks(currenttasks.map((t) => (t.id === editingTask.id ? newTask : t)))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Toastx></Toastx>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">

        {isMobile ? (
          <div>
            <Button className="md:hidden text-xl" onClick={() => setOpen(!open)}>
              ☰
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
              <NotificationList notifications={notifications} />
            </Button>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
                Todo <span className="text-blue-600">App</span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">Manage your tasks effortlessly</p>
            </div>
            <div className="relative w-96 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                <NotificationList notifications={notifications} />
              </Button>
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
          </div>
        )
        }
        {open && (
          <div className="md:hidden">
            <Button onClick={handleOpenAdd}>Add Task</Button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">

        <StatCards stats={stats} />
        {isMobile && (
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
              className="pl-10 bg-slate-50 border-slate-200 focus:bg-white"
            />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <ListFilter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-500 mr-1">Filter:</span>
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${filter === opt.value
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="rounded-xl bg-red-50 border border-red-200 text-red-600 px-6 py-5 text-sm text-center">
            Failed to load tasks — {error.message}
          </div>
        ) : (
          <TaskList
            tasks={filtered}
            onMarkDone={handleMarkDone}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      <TaskDialog
        open={dialogOpen}
        mode={dialogMode}
        initialData={editingTask}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}