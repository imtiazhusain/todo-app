import { http } from './http'
import type { Weather } from '../types/weather'

export const weatherApi = {
  getByCity: (city: string) => http<Weather>(`/weather?city=${encodeURIComponent(city)}`),
}