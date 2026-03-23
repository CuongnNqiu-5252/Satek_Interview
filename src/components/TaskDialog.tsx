import { useState, useEffect } from "react"
import { X } from "lucide-react"
import type { Task } from "../types/task"

interface TaskDialogProps {
  open: boolean
  mode: "add" | "edit"
  initialData?: Task | null
  onClose: () => void
  onSave: (
    data: { title: string; status: Task["status"]; deadline?: Date }
  ) => void
}

const STATUS_OPTIONS: { value: Task["status"]; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "inprogress", label: "In Progress" },
  { value: "done", label: "Done" },
]

export default function TaskDialog({ open, mode, initialData, onClose, onSave }: TaskDialogProps) {
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState<Task["status"]>("todo")
  const [deadline, setDeadline] = useState("")

  // Sync form when modal opens or initialData changes
  useEffect(() => {
    if (open) {
      setTitle(initialData?.title ?? "")
      setStatus(initialData?.status ?? "todo")
      setDeadline(
        initialData?.deadline
          ? new Date(initialData.deadline).toISOString().slice(0, 10)
          : ""
      )
    }
  }, [open, initialData])

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSave({
      title: title.trim(),
      status,
      deadline: deadline ? new Date(deadline) : undefined,
    })
    onClose()
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal */}
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            {mode === "add" ? "Add New Task" : "Edit Task"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task["status"])}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Deadline <span className="text-slate-400 text-xs">(optional)</span></label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end gap-3 pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mode === "add" ? "Add Task" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
