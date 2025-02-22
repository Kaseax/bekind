"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { SuggestionsTable } from "./_components/suggestions-table";
import toast from "react-hot-toast";

type Suggestion = {
  id: number;
  suggestion: string;
  status: "pending" | "approved" | "declined";
};

export default function AdminDashboard() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [user, setUser] = useState<unknown>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/admin/login");
      } else {
        setUser(data.user);
      }
    }

    checkUser();
  }, [router]);

  useEffect(() => {
    async function loadSuggestions() {
      try {
        const { data, error } = await supabase
          .from("suggestions")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        if (data) {
          setSuggestions(data as Suggestion[]);
        }
      } catch (err) {
        console.error("Failed to load suggestions", err);
      }
    }

    if (user) {
      loadSuggestions();
    }
  }, [user]);

  const handleApprove = async (id: number) => {
    try {
      const actText = suggestions.find((item) => item.id === id)?.suggestion;

      const { error : updateError } = await supabase
        .from("suggestions")
        .update({ status: "approved" })
        .eq("id", id);

      if (updateError) {
        toast.error("Failed to approve suggestion");
        console.error("Failed to approve suggestion:", updateError);
        return;
      }

      const { error: insertError } = await supabase
        .from("acts")
        .insert({ act: actText });

      if (insertError) {
        toast.error("Failed to insert act");
        console.error("Failed to insert act:", insertError);
      } else {
        toast.success("Suggestion approved and added as an act");
      }

      setSuggestions((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "approved" } : item,
        ),
      );
    } catch (error) {
      console.error("Failed to approve suggestion:", error);
    }
  };

  const handleDecline = async (id: number) => {
    try {
      const { error } = await supabase
        .from("suggestions")
        .update({ status: "declined" })
        .eq("id", id);

      if (error) {
        toast.error("Failed to decline suggestion.");
        console.error("Failed to decline suggestion:", error);
        return;
      }

      toast.success("Suggestion declined.");

      setSuggestions((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "declined" } : item,
        ),
      );
    } catch (error) {
      console.error("Failed to decline suggestion:", error);
      toast.error("Failed to decline suggestion.");
    }
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    router.push("/");
  };

  if (!user) return null;

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <Card
        className="w-full max-w-4xl border-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-16">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardHeader>
        <CardContent>
          <SuggestionsTable
            suggestions={suggestions}
            onApprove={handleApprove}
            onDecline={handleDecline}
          />
        </CardContent>
      </Card>
    </main>
  );
}
