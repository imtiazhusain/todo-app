import { ApiError } from '../utils/ApiError.js';

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const CACHE_TTL_MS = 10 * 60 * 1000;
const cache = new Map();

// https://open-meteo.com/en/docs (WMO weather codes)
const describe = (code) => {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 48) return 'Fog';
  if (code <= 57) return 'Drizzle';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Rain showers';
  return 'Thunderstorm';
};

async function getJson(url) {
  let res;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(5000) });
  } catch {
    throw new ApiError(502, 'Weather service is not responding. Try again shortly.');
  }
  if (!res.ok) throw new ApiError(502, 'Weather service returned an error.');
  return res.json();
}

export const weatherService = {
  async getByCity(city) {
    const key = city.toLowerCase();
    const hit = cache.get(key);
    if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.data;

    const geo = await getJson(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1`);
    const place = geo.results?.[0];
    if (!place) throw new ApiError(404, `No city found for "${city}"`);

    const params = new URLSearchParams({
      latitude: place.latitude,
      longitude: place.longitude,
      current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
    });
    const { current } = await getJson(`${FORECAST_URL}?${params}`);

    const data = {
      city: place.name,
      country: place.country,
      temperatureC: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windKmh: current.wind_speed_10m,
      condition: describe(current.weather_code),
    };
    cache.set(key, { at: Date.now(), data });
    return data;
  },
};