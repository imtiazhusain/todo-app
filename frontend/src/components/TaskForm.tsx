import { useState } from 'react'
import type { FormEvent } from 'react'
import type { TaskInput } from '../types/task'

interface Props {
  onSubmit: (input: TaskInput) => Promise<void>
}

const field =
  'w-full rounded-md border border-ink/25 px-3 py-2 outline-none focus:border-moss focus:ring-2 focus:ring-moss/30'

export default function TaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return setError('Enter a title for the task.')
    setSaving(true)
    setError(null)
    try {
      await onSubmit({ title: title.trim(), description: description.trim() })
      setTitle('')
      setDescription('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add the task.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-ink/15 bg-white p-4 sm:p-5">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">What needs doing?</label>
        <input id="title" value={title} maxLength={100} onChange={(e) => setTitle(e.target.value)}
          placeholder="Send the invoice to the client" className={field} />
      </div>
      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">Notes (optional)</label>
        <textarea id="description" value={description} maxLength={500} rows={2}
          onChange={(e) => setDescription(e.target.value)} className={`${field} resize-none`} />
      </div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={saving}
        className="w-full rounded-md bg-moss px-4 py-2 font-medium text-white transition hover:bg-moss-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss disabled:opacity-60 sm:w-auto">
        {saving ? 'Adding…' : 'Add task'}
      </button>
    </form>
  )
}
