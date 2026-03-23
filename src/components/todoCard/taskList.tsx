import { ClipboardList } from "lucide-react"
import type { Task } from "../../types/task"
import TaskCardChild from "./taskCard"

interface TaskListProps {
  tasks: Task[]
  onMarkDone: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export default function TaskList({ tasks, onMarkDone, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
        <ClipboardList className="w-14 h-14 opacity-40" />
        <p className="text-lg font-medium">No tasks yet</p>
        <p className="text-sm">Click "Add Task" to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {tasks.map((task) => (
        <TaskCardChild
          key={task.id}
          task={task}
          onMarkDone={onMarkDone}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
