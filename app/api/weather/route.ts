import { NextResponse } from "next/server";
import { z } from "zod";

const citySchema = z.string().min(1).max(100);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    const parsed = citySchema.safeParse(city);
    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid city" }, { status: 400 });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "Weather service unavailable" }, { status: 503 });
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(parsed.data)}`,
            { next: { revalidate: 1800 } },
        );

        if (!response.ok) {
            return NextResponse.json({ error: "Weather data unavailable" }, { status: 502 });
        }

        const data = await response.json();

        return NextResponse.json({
            temperature: Math.round(data.current.temp_c),
            icon: `https:${data.current.condition.icon}`,
            label: data.current.condition.text,
        });
    } catch {
        return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
    }
}
