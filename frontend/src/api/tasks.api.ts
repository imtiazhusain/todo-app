import { http } from './http'
import type { Task, TaskInput, TaskUpdate } from '../types/task'

export const tasksApi = {
  getAll: () => http<Task[]>('/tasks'),
  create: (input: TaskInput) =>
    http<Task>('/tasks', { method: 'POST', body: JSON.stringify(input) }),
  update: (id: string, changes: TaskUpdate) =>
    http<Task>(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(changes) }),
  remove: (id: string) => http<void>(`/tasks/${id}`, { method: 'DELETE' }),
}
