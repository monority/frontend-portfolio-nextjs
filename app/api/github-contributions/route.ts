import { NextRequest, NextResponse } from "next/server";
import { serverEnv } from "../../../env.server";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

const REVALIDATE_SECONDS = 1800;

function calendarYearRange(year: number): { from: string; to: string } {
    return {
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`,
    };
}

export async function GET(request: NextRequest) {
    const username = request.nextUrl.searchParams.get("username");
    const year =
        Number(request.nextUrl.searchParams.get("year")) ||
        new Date().getFullYear();

    if (!username) {
        return NextResponse.json(
            { error: "Username is required" },
            { status: 400 }
        );
    }

    const range = calendarYearRange(year);
    const from = range.from;
    const to = range.to;

    const query = `
    query (
      $username: String!
      $from: DateTime!
      $to: DateTime!
    ) {
      user(login: $username) {
        contributionsCollection(
          from: $from
          to: $to
        ) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
                weekday
              }
            }
          }
        }
      }
    }
  `;

    const githubToken = serverEnv.GITHUB_TOKEN;

    if (!githubToken) {
        return NextResponse.json(
            { error: "GitHub token not configured" },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(GITHUB_GRAPHQL_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${githubToken}`,
                "User-Agent": "frontend-portfolio-nextjs",
            },
            body: JSON.stringify({
                query,
                variables: {
                    username,
                    from,
                    to,
                },
            }),
            next: {
                revalidate: REVALIDATE_SECONDS,
            },
        });

        const result = await response.json();

        if (!response.ok || result.errors) {
            console.error("GitHub GraphQL error:", result.errors);

            return NextResponse.json(
                { error: "GitHub API error" },
                { status: 500 }
            );
        }

        if (!result.data?.user) {
            return NextResponse.json(
                { error: "GitHub user not found" },
                { status: 404 }
            );
        }

        const calendar =
            result.data.user.contributionsCollection.contributionCalendar;

        return NextResponse.json(
            {
                total: calendar.totalContributions,
                weeks: calendar.weeks,
            },
            {
                headers: {
                    "Cache-Control": `s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS * 2}`,
                },
            }
        );
    } catch (error) {
        console.error("GitHub API error:", error);

        return NextResponse.json(
            { error: "Failed to fetch GitHub contributions" },
            { status: 500 }
        );
    }
}