import { useMemo, useState } from 'react'
import ErrorBanner from '../components/ErrorBanner'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useTasks } from '../hooks/useTasks'

type Filter = 'all' | 'active' | 'completed'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'To do' },
  { value: 'completed', label: 'Done' },
]

const EMPTY: Record<Filter, string> = {
  all: 'No tasks yet. Add your first one above.',
  active: 'Nothing left to do.',
  completed: 'No completed tasks yet.',
}

export default function HomePage() {
  const { tasks, loading, error, reload, addTask, updateTask, deleteTask } = useTasks()
  const [filter, setFilter] = useState<Filter>('all')

  const visible = useMemo(
    () => tasks.filter((t) => (filter === 'all' ? true : filter === 'completed' ? t.completed : !t.completed)),
    [tasks, filter],
  )
  const doneCount = tasks.filter((t) => t.completed).length

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:py-12">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
        <p className="mt-1 text-ink/60">
          {tasks.length === 0 ? 'Nothing on the list.' : `${doneCount} of ${tasks.length} done`}
        </p>
      </header>

      <TaskForm onSubmit={addTask} />

      {error && <ErrorBanner message={error} onRetry={reload} />}

      <div role="tablist" aria-label="Filter tasks" className="flex gap-1 border-b border-ink/15">
        {FILTERS.map((f) => (
          <button key={f.value} role="tab" aria-selected={filter === f.value} onClick={() => setFilter(f.value)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium ${
              filter === f.value ? 'border-moss text-moss' : 'border-transparent text-ink/60 hover:text-ink'
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="py-8 text-center text-ink/60">Loading tasks…</p>
      ) : (
        <TaskList tasks={visible} emptyMessage={EMPTY[filter]} onUpdate={updateTask} onDelete={deleteTask} />
      )}
    </main>
  )
}
