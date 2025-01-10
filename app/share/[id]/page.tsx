import { db } from "@/lib/db/db";
import { acts } from "@/lib/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShareButton from "@/app/share/[id]/_components/share-button";

type Act = InferSelectModel<typeof acts>;

export default async function SharePage({ params }: { params: { id: number }}) {
    const { id } = params;

    let act: string | null = null;

    try {
        const result: Act[] = await db
            .select()
            .from(acts)
            .where(eq(acts.id, id))
            .limit(1);

        if (result.length > 0) {
            act = result[0].act;
        }
    } catch (error) {
        console.error("Failed to fetch act by ID", error);
    }

    if (!act) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Act not found</h1>
                    <p>We couldn&apos;t find the act you&apos;re looking for.</p>
                </div>
            </main>
        );
    }

    return (
        <main
            className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
            <Card
                className="w-full max-w-md border-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CardHeader className="space-y-4 text-center">
                    <div className="flex justify-center">
                        <Heart className="w-12 h-12 text-red-500" fill="currentColor"/>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Shared Act of Kindness</h1>
                        <p className="text-muted-foreground">
                            Someone wanted to share this act of kindness with you. Will you help spread the positivity?
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative overflow-hidden rounded-lg bg-secondary p-4">
                        <p className="text-lg font-medium">{act}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <div className="grid w-full grid-cols-2 gap-4">
                        <Button asChild>
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4"/>
                                Generate Your Own
                            </Link>
                        </Button>
                        <ShareButton act={act} />
                    </div>
                </CardFooter>
            </Card>
        </main>
    );

}