import { weatherService } from '../services/weather.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getWeather = asyncHandler(async (req, res) => {
  const weather = await weatherService.getByCity(req.query.city);
  res.status(200).json({ data: weather });
});