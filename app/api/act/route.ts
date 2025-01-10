import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";
import { suggestions } from "@/lib/db/schema";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(5, "60 s"),
    analytics: true,
});

export async function GET() {
    try {
        const result = await db.$client`
          SELECT * FROM acts
          ORDER BY random()
          LIMIT 1
        `;

        if (result.length === 0) {
            return NextResponse.json({ error: "No act found" }, { status: 404 });
        }

        return NextResponse.json({ act: result[0].act, actId: result[0].id }, { status: 200 });
    } catch (error) {
        console.log("Failed to fetch act", error);
        return new NextResponse("Failed to fetch act", { status: 500 });
    }
}

export async function POST(req: Request) {
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("remote-addr") || "unknown";

    const { success, reset } = await ratelimit.limit(clientIp);
    if (!success) {
        return NextResponse.json({ error: "Rate limit exceeded", reset }, { status: 429 });
    }

    try {
        const { suggestion } = await req.json();
        if (!suggestion) {
            return new NextResponse("Suggestion cannot be empty", { status: 400 });
        }

        await db.insert(suggestions).values({ suggestion });
        return new NextResponse("Suggestion added", { status: 201 });
    } catch (error) {
        console.log("Failed to add suggestion", error);
        return new NextResponse("Failed to add suggestion", { status: 500 });
    }
}