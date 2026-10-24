import { Router } from 'express';
import { getWeather } from '../controllers/weather.controller.js';
import { validateQuery } from '../middlewares/validate.js';
import { weatherQuerySchema } from '../validators/weather.validator.js';

const router = Router();

router.get('/', validateQuery(weatherQuerySchema), getWeather);

export default router;