import { useState } from 'react'
import type { FormEvent } from 'react'
import { useWeather } from '../hooks/useWeather'

export default function WeatherCard() {
    const { weather, loading, error, search } = useWeather('Islamabad')
    const [city, setCity] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (city.trim()) search(city.trim())
    }

    return (
        <section aria-label="Weather" className="rounded-lg border border-ink/15 bg-white p-4 sm:p-5">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    aria-label="City"
                    value={city}
                    maxLength={60}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Check the weather in another city"
                    className="min-w-0 flex-1 rounded-md border border-ink/25 px-3 py-2 outline-none focus:border-moss focus:ring-2 focus:ring-moss/30"
                />
                <button type="submit" disabled={loading} className="rounded-md bg-moss px-4 py-2 font-medium text-white hover:bg-moss-dark disabled:opacity-60">
                    Search
                </button>
            </form>

            <div className="mt-4 min-h-16" aria-live="polite">
                {loading && <p className="text-ink/60">Loading weather…</p>}
                {!loading && error && <p role="alert" className="text-sm text-red-700">{error}</p>}
                {!loading && !error && weather && (
                    <div className="flex items-baseline justify-between gap-4">
                        <div>
                            <p className="font-medium">{weather.city}, {weather.country}</p>
                            <p className="text-sm text-ink/65">{weather.condition}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-semibold">{Math.round(weather.temperatureC)}°C</p>
                            <p className="text-sm text-ink/65">Humidity {weather.humidity}% · Wind {weather.windKmh} km/h</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}