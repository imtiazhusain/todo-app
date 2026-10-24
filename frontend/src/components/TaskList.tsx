import type { Task, TaskUpdate } from '../types/task'
import TaskItem from './TaskItem'

interface Props {
  tasks: Task[]
  emptyMessage: string
  onUpdate: (id: string, changes: TaskUpdate) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function TaskList({ tasks, emptyMessage, onUpdate, onDelete }: Props) {
  if (tasks.length === 0) {
    return <p className="rounded-lg border border-dashed border-ink/25 p-8 text-center text-ink/60">{emptyMessage}</p>
  }
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  )
}
