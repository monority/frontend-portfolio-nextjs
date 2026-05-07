"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

interface LocalTimeProps {
    className?: string;
    label?: string;
}

type CityStatus = "idle" | "loading" | "success" | "error";

// function capitalizeFirstLetter(value: string) {
//     if (!value) {
//         return value;
//     }

//     return value.charAt(0).toUpperCase() + value.slice(1);
// }

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
    const t = useTranslations("localTime");
    const [currentDate, setCurrentDate] = useState<Date | null>(null);
    const [city, setCity] = useState("");
    const [timeZone, setTimeZone] = useState("");
    const [cityStatus, setCityStatus] = useState<CityStatus>("idle");

    useEffect(() => {
        setCurrentDate(new Date());
        setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);

        const intervalId = window.setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setCityStatus("error");
            return;
        }

        let cancelled = false;

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    setCityStatus("loading");

                    const coordinatesParams = new URLSearchParams({
                        format: "jsonv2",
                        lat: String(coords.latitude),
                        lon: String(coords.longitude),
                        zoom: "10",
                        addressdetails: "1",
                    });

                    const [cityResponse, timeZoneResponse] = await Promise.all([
                        fetch(`https://nominatim.openstreetmap.org/reverse?${coordinatesParams.toString()}`, {
                            headers: {
                                Accept: "application/json",
                            },
                        }),
                        fetch(
                            `https://timeapi.io/api/Time/current/coordinate?latitude=${coords.latitude}&longitude=${coords.longitude}`
                        ),
                    ]);

                    if (!cityResponse.ok) {
                        throw new Error("Failed to resolve city");
                    }

                    const cityData = await cityResponse.json();
                    const resolvedCity =
                        cityData.address?.city ||
                        cityData.address?.town ||
                        cityData.address?.village ||
                        cityData.address?.municipality ||
                        cityData.address?.county;

                    if (!timeZoneResponse.ok) {
                        throw new Error("Failed to resolve timezone");
                    }

                    const timeZoneData = await timeZoneResponse.json();
                    const resolvedTimeZone = typeof timeZoneData.timeZone === "string" ? timeZoneData.timeZone : "";

                    if (!cancelled) {
                        if (resolvedCity) {
                            setCity(resolvedCity);
                            setCityStatus("success");
                        } else {
                            setCityStatus("error");
                        }

                        if (resolvedTimeZone) {
                            setTimeZone(resolvedTimeZone);
                        }
                    }
                } catch {
                    if (!cancelled) {
                        setCityStatus("error");
                    }
                }
            },
            () => {
                if (!cancelled) {
                    setCityStatus("error");
                }
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000,
            }
        );

        return () => {
            cancelled = true;
        };
    }, []);

    const { day, time } = useMemo(() => {
        if (!currentDate) {
            return { day: "--", time: "--:--:--" };
        }

        return formatLocalDateTime(currentDate, locale, timeZone || undefined);
    }, [currentDate, locale, timeZone]);
    const cityLabel = useMemo(() => {
        if (cityStatus === "loading" || cityStatus === "idle") {
            return t("loadingCity");
        }

        if (cityStatus === "error") {
            return t("cityUnavailable");
        }

        return city;
    }, [city, cityStatus, t]);

    return (
        <div className={["local-time", className].filter(Boolean).join(" ")}>
            <div className="local-time__body">
                <div className="local-time__content">
                    <strong className="local-time__value">
                        <span className="local-time__day">{day}</span>
                        <span className="local-time__time"> {time} - {cityLabel}</span>
                    </strong>
                </div>
            </div>
        </div>
    );
}
