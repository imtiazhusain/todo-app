import { useCallback, useEffect, useState } from 'react'
import { weatherApi } from '../api/weather.api'
import type { Weather } from '../types/weather'

export function useWeather(initialCity: string) {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (city: string) => {
    setLoading(true)
    setError(null)
    try {
      setWeather(await weatherApi.getByCity(city))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the weather.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    search(initialCity)
  }, [initialCity, search])

  return { weather, loading, error, search }
}