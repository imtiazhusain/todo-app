import { useCallback, useEffect, useState } from 'react'
import { tasksApi } from '../api/tasks.api'
import type { Task, TaskInput, TaskUpdate } from '../types/task'

const messageOf = (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong.')

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setTasks(await tasksApi.getAll())
    } catch (e) {
      setError(messageOf(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // Mutations rethrow so forms can show feedback; the page banner covers list-level errors.
  const addTask = async (input: TaskInput) => {
    const created = await tasksApi.create(input)
    setTasks((prev) => [created, ...prev])
  }

  const updateTask = async (id: string, changes: TaskUpdate) => {
    try {
      const updated = await tasksApi.update(id, changes)
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)))
      setError(null)
    } catch (e) {
      setError(messageOf(e))
      throw e
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await tasksApi.remove(id)
      setTasks((prev) => prev.filter((t) => t._id !== id))
      setError(null)
    } catch (e) {
      setError(messageOf(e))
    }
  }

  return { tasks, loading, error, reload: load, addTask, updateTask, deleteTask }
}
