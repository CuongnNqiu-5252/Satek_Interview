import { CheckCircle2, Pencil, Trash2 } from "lucide-react"
import { cn } from "../../lib/utils"
import type { Task } from "../../types/task"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { useMemo } from "react"

interface TaskCardProps {
  task: Task
  onMarkDone: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

const STATUS_BADGE: Record<Task["status"], string> = {
  todo: "bg-gray-100 text-gray-600",
  inprogress: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
}

const STATUS_LABEL: Record<Task["status"], string> = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
}

const STATUS_BORDER: Record<Task["status"], string> = {
  todo: "border-t-slate-400",
  inprogress: "border-t-yellow-400",
  done: "border-t-green-500",
}

export default function TaskCardChild({ task, onMarkDone, onEdit, onDelete }: TaskCardProps) {
  const isOverdue: boolean = useMemo(() => {
    return task.deadline && new Date(task.deadline) < new Date() && task.status !== "done"
  }, [task])
  const isNearDeadline: boolean = useMemo(() => {
    const now = new Date()
    const diff = new Date(task.deadline).getTime() - now.getTime()
    const hours = diff / (1000 * 60 * 60)
    return hours > 0 && hours <= 24 && task.status !== "done"
  }, [task])
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl bg-white p-4 shadow-md border-t-4",
        "transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
        STATUS_BORDER[task.status],
        task.status === "done" && "opacity-75"
      )}
    >
      {/* Status badge */}
      <span
        className={cn(
          "w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold",
          STATUS_BADGE[task.status]
        )}
      >
        {STATUS_LABEL[task.status]}
      </span>

      {/* Title */}
      <p
        className={cn(
          "flex-1 text-sm font-semibold text-slate-800 leading-snug",
          task.status === "done" && "line-through text-slate-400"
        )}
      >
        {task.title}
      </p>

      {/* Deadline */}
      {task.deadline && (
        <p className="text-xs text-slate-400">
          Due: {new Date(task.deadline).toLocaleDateString()}
        </p>
      )}
      {isNearDeadline && (
        <span className="text-xs border w-25 justify-center bg-red-50 flex rounded-full border-red-500 text-red-500">
          Near Deadline
        </span>
      )}
      {isOverdue && (
        <span className="text-xs border w-25 justify-center bg-red-50 flex rounded-full border-red-500 text-red-500">
          Overdue
        </span>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 pt-1 border-t border-slate-100">
        <button
          onClick={() => onMarkDone(task)}
          disabled={task.status === "done"}
          title="Mark as Done"
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
            task.status === "done"
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-green-50 text-green-700 hover:bg-green-100 active:scale-95"
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Done
        </button>

        <button
          onClick={() => onEdit(task)}
          title="Edit Task"
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-200 active:scale-95"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>

        <button

          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 active:scale-95 ml-auto"
        >

          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button title="Delete Task"
                  variant="outline"><Trash2 className="w-3.5 h-3.5" /></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Delete task</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this task?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button className="bg-black text-white" onClick={() => onDelete(task.id)}>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </button>
      </div>
    </div>
  )
}