"use client";

import {useEffect, useState} from "react";
import { Heart, Sparkles, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function Home() {
    const [currentAct, setCurrentAct] = useState<{ act?: string; actId?: number } | undefined>(undefined);
    const [suggestion, setSuggestion] = useState("");
    const [isHeartAnimating, setIsHeartAnimating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        generateNew();
    }, []);

    const generateNew = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/act", { method: "GET" });
            if (response?.ok) {
                const data = await response.json();
                setCurrentAct(data);
                setIsHeartAnimating(true);
                setTimeout(() => setIsHeartAnimating(false), 1000);
            }
        } catch (error) {
            console.error("Failed to fetch act", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleShare = async () => {
        console.log("share");
        console.log(currentAct);
        if (!currentAct?.actId) {
            toast.error("Failed to copy link to clipboard");
            return;
        }

        const shareUrl = `${window.location.origin}/share/${currentAct.actId}`;

        if (navigator.share) {
            await navigator.share({ title: "bekind.", text: currentAct.act, url: shareUrl }).then(() => {
                toast.success("Link copied to clipboard");
            }).catch((error) => {
                console.error("Failed to copy link to clipboard", error);
                toast.error("Failed to copy link to clipboard");
            });
        } else {
            navigator.clipboard.writeText(shareUrl).then(() => {
                toast.success("Link copied to clipboard");
            }).catch((error) => {
                console.error("Failed to copy link to clipboard", error);
                toast.error("Failed to copy link to clipboard");
            });
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!suggestion.trim()) {
            toast.error("Suggestion cannot be empty!");
            return;
        }

        try {
            setIsLoading(true);

            const response = await fetch("/api/act", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ suggestion }),
            });

            if (response.status === 429) {
                const { reset } = await response.json();
                const retryAfter = new Date(reset * 1000).toLocaleTimeString();
                toast.error(`You're sending too many suggestions. Try again after ${retryAfter}.`);
                return;
            }

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error || "Failed to submit suggestion");
            }

            setSuggestion("");
            toast.success("Thank you for your suggestion!");
        } catch (error) {
            console.error("Failed to add suggestion", error);
            toast.error("Failed to add suggestion. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main
            className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
            <Card
                className="w-full max-w-md border-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CardHeader className="space-y-4 text-center">
                    <div className="flex justify-center">
                        <Heart
                            className={cn(
                                "w-12 h-12 text-red-500",
                                isHeartAnimating && "animate-ping"
                            )}
                            fill="currentColor"
                        />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">bekind.</h1>
                        <p className="text-muted-foreground">
                            Be kind to everyone! A simple act of kindness can brighten someone&apos;s
                            day and create positivity in our world.
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative overflow-hidden rounded-lg bg-secondary p-4">
                        <Sparkles className="absolute right-2 top-2 w-4 h-4 text-yellow-500"/>
                        <p className="text-lg font-medium pr-6">{currentAct?.act || "Loading..."}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button onClick={generateNew} className="w-full" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Generate New"}
                        </Button>
                        <Button onClick={handleShare} variant="secondary" className="w-full">
                            <Share2 className="mr-2 h-4 w-4"/>
                            Share
                        </Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <form onSubmit={handleSubmit} className="w-full flex gap-2">
                        <Input
                            placeholder="Suggest an act"
                            value={suggestion}
                            onChange={(e) => setSuggestion(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" variant="outline">
                            Submit
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </main>
    );
}
