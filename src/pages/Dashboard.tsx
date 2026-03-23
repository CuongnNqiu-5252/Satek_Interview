import { useState } from "react"
import { Plus, ListFilter } from "lucide-react"
import { useTaskContext } from "../features/todo/provider/taskProvider"
import type { Task } from "../types/task"
import TaskList from "../components/todoCard/taskList"
import TaskDialog from "../components/TaskDialog"
import StatCards from "../components/statCards"

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "todo", label: "To Do" },
  { value: "inprogress", label: "In Progress" },
  { value: "done", label: "Done" },
]

export default function Dashboard() {
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTaskContext()

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add")
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Filter state
  const [filter, setFilter] = useState("all")

  // Stats
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "done").length,
    pending: tasks.filter((t) => t.status !== "done").length,
    overdue: tasks.filter(
      (t) => t.deadline && new Date(t.deadline) < new Date() && t.status !== "done"
    ).length,
  }

  // Filtered view
  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter)

  // Handlers
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
    await updateTask({ ...task, status: "done", completed: true })
  }

  const handleDelete = async (id: number) => {
    await deleteTask(id)
  }

  const handleSave = async (data: {
    title: string
    status: Task["status"]
    deadline?: Date
  }) => {
    if (dialogMode === "add") {
      await addTask({
        id: Date.now(),
        title: data.title,
        status: data.status,
        completed: data.status === "done",
        created_at: new Date(),
        deadline: data.deadline ?? new Date(),
      })
    } else if (editingTask) {
      await updateTask({
        ...editingTask,
        title: data.title,
        status: data.status,
        completed: data.status === "done",
        deadline: data.deadline ?? editingTask.deadline,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
              Todo <span className="text-blue-600">App</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Manage your tasks effortlessly</p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">

        {/* Stat Cards */}
        <StatCards stats={stats} />

        {/* Toolbar: filter */}
        <div className="flex flex-wrap items-center gap-2">
          <ListFilter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-500 mr-1">Filter:</span>
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                filter === opt.value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Loading / Error / List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="rounded-xl bg-red-50 border border-red-200 text-red-600 px-6 py-5 text-sm text-center">
            ⚠️ Failed to load tasks — {error.message}
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

      {/* ── Dialog ── */}
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