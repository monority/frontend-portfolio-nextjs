import { useEffect, useState } from 'react'

interface WeatherData {
    temperature: number
    icon: string
    label: string
}

interface WeatherProps {
    city?: string
    className?: string
}

type WeatherStatus = 'loading' | 'success' | 'error'

export default function Weather({
    city = 'Lille',
    className = '',
}: WeatherProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [status, setStatus] = useState<WeatherStatus>('loading')

    useEffect(() => {
        const controller = new AbortController()

        async function loadWeather() {
            try {
                setStatus('loading')

                const response = await fetch(
                    `/api/weather?city=${encodeURIComponent(city)}`,
                    { signal: controller.signal }
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch weather')
                }

                const data = await response.json()

                setWeather({
                    temperature: data.temperature,
                    icon: data.icon,
                    label: data.label,
                })

                setStatus('success')
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    setStatus('error')
                }
            }
        }

        loadWeather()

        return () => controller.abort()
    }, [city])

    if (status === 'error') {
        return (
            <div className={`weather weather--error ${className}`.trim()}>
                <span className="weather__error">--°C</span>
            </div>
        )
    }

    return (
        <div className={`weather ${className}`.trim()}>
            {weather ? (
                <>
                    <img
                        className="weather__icon"
                        src={weather.icon}
                        alt={weather.label}
                        width="40"
                        height="40"
                        loading="eager"
                        decoding="async"
                    />
                    <span className="weather__temp">{weather.temperature}°C</span>
                </>
            ) : (
                <>
                    <span className="weather__skeleton weather__skeleton--icon" aria-hidden="true" />
                    <span className="weather__skeleton weather__skeleton--text" aria-hidden="true" />
                </>
            )}
        </div>
    )
}