"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import "./github-contributions.css";

type ContributionDay = {
    date: string;
    contributionCount: number;
    contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
    weekday: number;
};

type ContributionWeek = {
    contributionDays: ContributionDay[];
};

type GitHubResponse = {
    total: number;
    weeks: ContributionWeek[];
};

type GitHubContributionsProps = {
    username: string;
    year?: number;
};

/** Coordonnées du viewBox — cellule 11 + gap 3 = pas 14. */
const VB_CELL = 11;
const VB_GAP = 3;
const VB_STEP = VB_CELL + VB_GAP;
const VB_ROWS = 7;

const levelClass: Record<ContributionDay["contributionLevel"], string> = {
    NONE: "github-contributions__cell--level-0",
    FIRST_QUARTILE: "github-contributions__cell--level-1",
    SECOND_QUARTILE: "github-contributions__cell--level-2",
    THIRD_QUARTILE: "github-contributions__cell--level-3",
    FOURTH_QUARTILE: "github-contributions__cell--level-4",
};

/** Ordre des lignes : Sun en haut (weekday 0) → Mon/Wed/Fri sur les lignes 1/3/5. */
const DAY_KEYS = ["", "mon", "", "wed", "", "fri", ""] as const;

const MONTH_KEYS = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec",
] as const;

function todayUtc(): string {
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = String(now.getUTCMonth() + 1).padStart(2, "0");
    const d = String(now.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function computeMonthLabels(
    weeks: ContributionWeek[],
    monthNames: readonly string[]
): Array<{ label: string; weekIndex: number }> {
    const labels: Array<{ label: string; weekIndex: number }> = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
        const firstDay = week.contributionDays[0];
        if (!firstDay) return;

        const date = new Date(firstDay.date + "T00:00:00");
        const month = date.getMonth();
        if (month !== lastMonth) {
            labels.push({ label: monthNames[month], weekIndex });
            lastMonth = month;
        }
    });

    return labels;
}

function SkeletonState() {
    const t = useTranslations("githubContributions");
    const cols = 53;
    const dayLabels = DAY_KEYS.map((key) => (key ? t(`days.${key}`) : ""));

    return (
        <div className="github-contributions github-contributions--loading">
            <div className="github-contributions__skeleton-bar" />

            <div
                className="github-contributions__chart"
                style={{ "--ghc-cols": cols } as React.CSSProperties}
            >
                <div className="github-contributions__day-labels" aria-hidden="true">
                    {dayLabels.map((label, i) => (
                        <span key={i} className="github-contributions__day-label">
                            {label}
                        </span>
                    ))}
                </div>

                <div className="github-contributions__main">
                    <div className="github-contributions__month-labels">
                        <div className="github-contributions__skeleton-month-bar" />
                    </div>

                    <div className="github-contributions__grid-scroll">
                        <div className="github-contributions__skeleton-grid">
                            {Array.from({ length: cols }).map((_, week) => (
                                <div key={week} className="github-contributions__skeleton-week">
                                    {Array.from({ length: 7 }).map((_, day) => (
                                        <div
                                            key={day}
                                            className="github-contributions__skeleton-cell"
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="github-contributions__legend">
                <span className="github-contributions__legend-label">{t("less")}</span>
                <span className="github-contributions__legend-swatch github-contributions__legend-swatch--level-0" />
                <span className="github-contributions__legend-swatch github-contributions__legend-swatch--level-1" />
                <span className="github-contributions__legend-swatch github-contributions__legend-swatch--level-2" />
                <span className="github-contributions__legend-swatch github-contributions__legend-swatch--level-3" />
                <span className="github-contributions__legend-swatch github-contributions__legend-swatch--level-4" />
                <span className="github-contributions__legend-label">{t("more")}</span>
            </div>
        </div>
    );
}

export default function GitHubContributions({
    username,
    year,
}: GitHubContributionsProps) {
    const t = useTranslations("githubContributions");
    const locale = useLocale();
    const selectedYear = year ?? new Date().getFullYear();
    const [data, setData] = useState<GitHubResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const abortRef = useRef<AbortController | null>(null);
    const today = useMemo(() => todayUtc(), []);

    const dayLabels = useMemo(
        () => DAY_KEYS.map((key) => (key ? t(`days.${key}`) : "")),
        [t]
    );
    const monthNames = useMemo(
        () => MONTH_KEYS.map((key) => t(`months.${key}`)),
        [t]
    );

    const fetchContributions = useCallback(() => {
        if (abortRef.current) abortRef.current.abort();

        const controller = new AbortController();
        abortRef.current = controller;

        (async () => {
            try {
                setLoading(true);
                setError(false);

                const response = await fetch(
                    `/api/github-contributions?username=${encodeURIComponent(username)}&year=${selectedYear}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("GitHub API error");
                }

                const result: GitHubResponse = await response.json();
                setData(result);
            } catch (err) {
                if ((err as Error).name === "AbortError") return;
                setError(true);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        })();
    }, [username, selectedYear]);

    useEffect(() => {
        fetchContributions();

        const REFRESH_MS = 30 * 60 * 1000;
        const intervalId = window.setInterval(() => {
            if (typeof document !== "undefined" && !document.hidden) {
                fetchContributions();
            }
        }, REFRESH_MS);

        let focusTimer: number | undefined;
        const onVisibility = () => {
            if (!document.hidden) {
                window.clearTimeout(focusTimer);
                focusTimer = window.setTimeout(fetchContributions, 2000);
            }
        };
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            window.clearInterval(intervalId);
            window.clearTimeout(focusTimer);
            document.removeEventListener("visibilitychange", onVisibility);
            if (abortRef.current) abortRef.current.abort();
        };
    }, [fetchContributions]);

    const monthLabels = useMemo(
        () => (data ? computeMonthLabels(data.weeks, monthNames) : []),
        [data, monthNames]
    );

    if (loading) {
        return <SkeletonState />;
    }

    if (error || !data) {
        return (
            <div className="github-contributions github-contributions--error">
                {t("error", { username })}
            </div>
        );
    }

    const cols = data.weeks.length;
    const vbWidth = cols * VB_STEP;
    const vbHeight = VB_ROWS * VB_STEP;

    return (
        <div className="github-contributions">
            <div className="github-contributions__header">
                <p className="github-contributions__title">
                    {t("heading", { total: data.total.toLocaleString(locale), year: selectedYear })}
                </p>

                <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-contributions__link"
                >
                    @{username}
                </a>
            </div>

            <div
                className="github-contributions__chart"
                style={{ "--ghc-cols": cols } as React.CSSProperties}
            >
                <div className="github-contributions__day-labels" aria-hidden="true">
                    {dayLabels.map((label, i) => (
                        <span key={i} className="github-contributions__day-label">
                            {label}
                        </span>
                    ))}
                </div>

                <div className="github-contributions__main">
                    <div className="github-contributions__month-labels" role="row">
                        {monthLabels.map(({ label, weekIndex }) => (
                            <span
                                key={`${label}-${weekIndex}`}
                                className="github-contributions__month-label"
                                role="columnheader"
                                style={{ left: `calc(${weekIndex} * (var(--ghc-cell) + var(--ghc-gap)))` }}
                            >
                                {label}
                            </span>
                        ))}
                    </div>

                    <div className="github-contributions__grid-scroll">
                        <svg
                            className="github-contributions__grid"
                            role="grid"
                            aria-label={t("ariaLabel", { username, year: selectedYear })}
                            viewBox={`0 0 ${vbWidth} ${vbHeight}`}
                            preserveAspectRatio="xMidYMid meet"
                        >
                            {data.weeks.map((week, weekIndex) =>
                                week.contributionDays.map((day) => {
                                    const x = weekIndex * VB_STEP;
                                    const y = day.weekday * VB_STEP;
                                    const isToday = day.date === today;
                                    const dateStr = new Date(day.date + "T00:00:00").toLocaleDateString(locale, {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    });
                                    return (
                                        <g key={day.date}>
                                            <rect
                                                role="gridcell"
                                                x={x}
                                                y={y}
                                                width={VB_CELL}
                                                height={VB_CELL}
                                                rx={2}
                                                ry={2}
                                                data-date={day.date}
                                                data-level={day.contributionLevel}
                                                className={`github-contributions__cell ${levelClass[day.contributionLevel]}${
                                                    isToday ? " github-contributions__cell--is-current" : ""
                                                }`}
                                            >
                                                <title>{t("dayTitle", { count: day.contributionCount, date: dateStr })}</title>
                                            </rect>
                                            {isToday && (
                                                <rect
                                                    x={x - 1}
                                                    y={y - 1}
                                                    width={VB_CELL + 2}
                                                    height={VB_CELL + 2}
                                                    rx={3}
                                                    ry={3}
                                                    className="github-contributions__cell-ring"
                                                    fill="none"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </g>
                                    );
                                })
                            )}
                        </svg>
                    </div>
                </div>
            </div>

            <div className="github-contributions__legend">
                <span className="github-contributions__legend-label">{t("less")}</span>
                <span className="github-contributions__legend-swatch github-contributions__legend-swatch--level-0" />
                <span className="github-contributions__legend-swatch github-contributions__legend-swatch--level-1" />
                <span className="github-contributions__legend-swatch github-contributions__legend-swatch--level-2" />
                <span className="github-contributions__legend-swatch github-contributions__legend-swatch--level-3" />
                <span className="github-contributions__legend-swatch github-contributions__legend-swatch--level-4" />
                <span className="github-contributions__legend-label">{t("more")}</span>
            </div>
        </div>
    );
}