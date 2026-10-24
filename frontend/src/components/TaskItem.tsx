import { useState } from 'react'
import type { Task, TaskUpdate } from '../types/task'

interface Props {
  task: Task
  onUpdate: (id: string, changes: TaskUpdate) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

const field =
  'w-full rounded-md border border-ink/25 px-3 py-2 outline-none focus:border-moss focus:ring-2 focus:ring-moss/30'

export default function TaskItem({ task, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [busy, setBusy] = useState(false)

  const run = async (fn: () => Promise<void>) => {
    setBusy(true)
    try {
      await fn()
    } catch {
      // the page-level banner shows the error
    } finally {
      setBusy(false)
    }
  }

  const save = () =>
    run(async () => {
      if (!title.trim()) return
      await onUpdate(task._id, { title: title.trim(), description: description.trim() })
      setEditing(false)
    })

  const cancel = () => {
    setTitle(task.title)
    setDescription(task.description)
    setEditing(false)
  }

  if (editing) {
    return (
      <li className="space-y-2 rounded-lg border border-moss bg-white p-4">
        <input aria-label="Task title" value={title} maxLength={100} onChange={(e) => setTitle(e.target.value)} className={field} />
        <textarea aria-label="Task notes" value={description} maxLength={500} rows={2}
          onChange={(e) => setDescription(e.target.value)} className={`${field} resize-none`} />
        <div className="flex gap-2">
          <button onClick={save} disabled={busy || !title.trim()}
            className="rounded-md bg-moss px-3 py-1.5 text-sm font-medium text-white hover:bg-moss-dark disabled:opacity-60">
            Save changes
          </button>
          <button onClick={cancel} className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-ink/5">Cancel</button>
        </div>
      </li>
    )
  }

  return (
    <li className="flex items-start gap-3 rounded-lg border border-ink/15 bg-white p-4">
      <input type="checkbox"
        aria-label={`Mark "${task.title}" as ${task.completed ? 'not done' : 'done'}`}
        checked={task.completed} disabled={busy}
        onChange={() => run(() => onUpdate(task._id, { completed: !task.completed }))}
        className="mt-1 h-5 w-5 shrink-0 accent-moss" />
      <div className="min-w-0 flex-1">
        <p className={`break-words font-medium ${task.completed ? 'text-ink/45 line-through' : ''}`}>{task.title}</p>
        {task.description && <p className="mt-0.5 break-words text-sm text-ink/65">{task.description}</p>}
      </div>
      <div className="flex shrink-0 gap-1">
        <button onClick={() => setEditing(true)} className="rounded-md px-2 py-1 text-sm font-medium text-moss hover:bg-moss/10 cursor-pointer">Edit</button>
        <button onClick={() => run(() => onDelete(task._id))} disabled={busy}
          className="rounded-md px-2 py-1 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60 cursor-pointer">
          Delete
        </button>
      </div>
    </li>
  )
}
