"use client";

import {Button} from "@/components/ui/button";
import {Share2} from "lucide-react";
import toast from "react-hot-toast";

export default function ShareButton({ act }: { act: string }) {
    return (
        <Button
            variant="secondary"
            onClick={() => {
                navigator.clipboard.writeText(process.env.NEXT_PUBLIC_SITE_URL + "/share/" + act);
                toast.success("Copied to clipboard!");
            }}
        >
            <Share2 className="mr-2 h-4 w-4"/>
            Share Again
        </Button>
    )
}