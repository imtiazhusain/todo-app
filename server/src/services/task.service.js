import { Task } from '../models/task.model.js';
import { ApiError } from '../utils/ApiError.js';

export const taskService = {
  getAll() {
    return Task.find().sort({ createdAt: -1 });
  },

  create(data) {
    return Task.create(data);
  },

  async update(id, changes) {
    const task = await Task.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
    if (!task) throw new ApiError(404, 'Task not found');
    return task;
  },

  async remove(id) {
    const task = await Task.findByIdAndDelete(id);
    if (!task) throw new ApiError(404, 'Task not found');
  },
};
