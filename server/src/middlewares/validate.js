import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';

export const validateBody = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map((i) => ({ field: i.path.join('.') || 'body', message: i.message }));
    return next(new ApiError(400, errors[0].message, errors));
  }
  req.body = result.data;
  next();
};

export const validateObjectId = (req, _res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) return next(new ApiError(400, 'Invalid task id'));
  next();
};


export const validateQuery = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    const errors = result.error.issues.map((i) => ({ field: i.path.join('.') || 'query', message: i.message }));
    return next(new ApiError(400, errors[0].message, errors));
  }
  req.query = result.data;
  next();
};
