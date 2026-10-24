import { taskService } from '../services/task.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getTasks = asyncHandler(async (_req, res) => {
  const tasks = await taskService.getAll();
  res.status(200).json({ data: tasks });
});

export const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.create(req.body);
  res.status(201).json({ data: task });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.update(req.params.id, req.body);
  res.status(200).json({ data: task });
});

export const deleteTask = asyncHandler(async (req, res) => {
  await taskService.remove(req.params.id);
  res.status(204).send();
});
