import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.controller.js';
import { validateBody, validateObjectId } from '../middlewares/validate.js';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator.js';

const router = Router();

router.route('/').get(getTasks).post(validateBody(createTaskSchema), createTask);

router
  .route('/:id')
  .all(validateObjectId)
  .patch(validateBody(updateTaskSchema), updateTask)
  .delete(deleteTask);

export default router;
