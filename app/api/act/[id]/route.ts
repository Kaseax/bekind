import { eq } from "drizzle-orm";
import { db } from "@/lib/db/db";
import { acts } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const numId = Number(id);

    if (!Number.isInteger(numId) || numId <= 0) {
        return NextResponse.json(
            { error: "Invalid id" },
            { status: 400 }
        )
    }

    try {
        const result = await db
            .select()
            .from(acts)
            .where(eq(acts.id, numId))
            .limit(1);

        if (result.length === 0) {
            return NextResponse.json({ error: "Act not found" }, { status: 404 });
        }

        return NextResponse.json({ act: result[0] }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch act by ID", error);
        return NextResponse.json({ error: "Failed to fetch act" }, { status: 500 });
    }
}
