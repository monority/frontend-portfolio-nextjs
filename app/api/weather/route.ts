import { NextResponse } from "next/server";
import { z } from "zod";

const citySchema = z.string().min(1).max(100);

const WEATHER_CODE_MAP: Record<number, { icon: string; label: string }> = {
    0: { icon: "☀️", label: "Clear sky" },
    1: { icon: "🌤️", label: "Mainly clear" },
    2: { icon: "⛅", label: "Partly cloudy" },
    3: { icon: "☁️", label: "Overcast" },
    45: { icon: "🌫️", label: "Fog" },
    48: { icon: "🌫️", label: "Depositing rime fog" },
    51: { icon: "🌦️", label: "Light drizzle" },
    53: { icon: "🌦️", label: "Drizzle" },
    55: { icon: "🌦️", label: "Dense drizzle" },
    56: { icon: "🌧️", label: "Freezing drizzle" },
    57: { icon: "🌧️", label: "Dense freezing drizzle" },
    61: { icon: "🌧️", label: "Slight rain" },
    63: { icon: "🌧️", label: "Rain" },
    65: { icon: "🌧️", label: "Heavy rain" },
    66: { icon: "🌧️", label: "Freezing rain" },
    67: { icon: "🌧️", label: "Heavy freezing rain" },
    71: { icon: "❄️", label: "Slight snow" },
    73: { icon: "❄️", label: "Snow" },
    75: { icon: "❄️", label: "Heavy snow" },
    77: { icon: "❄️", label: "Snow grains" },
    80: { icon: "🌦️", label: "Rain showers" },
    81: { icon: "🌦️", label: "Rain showers" },
    82: { icon: "🌧️", label: "Violent rain showers" },
    85: { icon: "🌨️", label: "Snow showers" },
    86: { icon: "🌨️", label: "Heavy snow showers" },
    95: { icon: "⛈️", label: "Thunderstorm" },
    96: { icon: "⛈️", label: "Thunderstorm with hail" },
    99: { icon: "⛈️", label: "Thunderstorm with heavy hail" },
};

function resolveWeatherCode(weatherCode: number) {
    return WEATHER_CODE_MAP[weatherCode] ?? { icon: "🌡️", label: "Weather" };
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    const parsed = citySchema.safeParse(city);
    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid city" }, { status: 400 });
    }

    try {
        const geocodingResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(parsed.data)}&count=1&language=en&format=json`,
            { next: { revalidate: 86400 } },
        );

        if (!geocodingResponse.ok) {
            return NextResponse.json({ error: "Weather data unavailable" }, { status: 502 });
        }

        const geocodingData = await geocodingResponse.json();
        const location = geocodingData.results?.[0];

        if (!location) {
            return NextResponse.json({ error: "City not found" }, { status: 404 });
        }

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&timezone=auto`,
            { next: { revalidate: 1800 } },
        );

        if (!weatherResponse.ok) {
            return NextResponse.json({ error: "Weather data unavailable" }, { status: 502 });
        }

        const data = await weatherResponse.json();
        const weatherCode = Number(data.current?.weather_code);
        const weather = resolveWeatherCode(weatherCode);

        return NextResponse.json({
            temperature: Math.round(data.current?.temperature_2m),
            icon: weather.icon,
            label: `${location.name}${location.admin1 ? `, ${location.admin1}` : ""} - ${weather.label}`,
        });
    } catch {
        return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
    }
}
