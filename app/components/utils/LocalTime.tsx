"use client";

import { useLocale } from "next-intl";
import { useEffect, useMemo, useState } from "react";

interface LocalTimeProps {
    className?: string;
    label?: string;
}

function formatLocalDateTime(date: Date, locale: string, timeZone?: string) {
    try {
        const weekday = new Intl.DateTimeFormat(locale, {
            weekday: "short",
            timeZone,
        }).format(date);

        const dateStr = new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "long",
            timeZone,
        }).format(date);

        const day = `${weekday} ${dateStr}`;

        const time = new Intl.DateTimeFormat(locale, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone,
        }).format(date);

        return { day, time };
    } catch {
        const weekday = new Intl.DateTimeFormat(locale, {
            weekday: "short",
        }).format(date);

        const dateStr = new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "long",
        }).format(date);

        const day = `${weekday} ${dateStr}`;

        const time = new Intl.DateTimeFormat(locale, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(date);

        return { day, time };
    }
}

export default function LocalTime({
    className = "",
}: LocalTimeProps) {
    const locale = useLocale();
    const [currentDate, setCurrentDate] = useState<Date | null>(null);
    const city = "Paris";
    const timeZone = "Europe/Paris";

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setCurrentDate(new Date());
        }, 0);

        const intervalId = window.setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            window.clearTimeout(timeoutId);
            window.clearInterval(intervalId);
        };
    }, []);

    const { day, time } = useMemo(() => {
        if (!currentDate) {
            return { day: "--", time: "--:--:--" };
        }

        return formatLocalDateTime(currentDate, locale, timeZone || undefined);
    }, [currentDate, locale, timeZone]);
    return (
        <div className={["local-time", className].filter(Boolean).join(" ")}>
            <div className="local-time__body">
                <div className="local-time__content">
                    <span className="local-time__eyebrow">Local time</span>
                    <strong className="local-time__value">
                        <span className="local-time__day">{day}</span>
                        <span className="local-time__time">{time}</span>
                    </strong>
                    <span className="local-time__meta">{city}</span>
                </div>
            </div>
        </div>
    );
}
