import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500, default: '' },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

taskSchema.index({ createdAt: -1 });

export const Task = mongoose.model('Task', taskSchema);
