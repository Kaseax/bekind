import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

type Suggestion = {
  id: number;
  suggestion: string;
  status: "pending" | "approved" | "declined";
};

interface SuggestionsTableProps {
  suggestions: Suggestion[];
  onApprove: (id: number) => void;
  onDecline: (id: number) => void;
}

export function SuggestionsTable({
                                   suggestions,
                                   onApprove,
                                   onDecline,
                                 }: SuggestionsTableProps) {
  return (
    <div className="flex justify-center">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Suggestion</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suggestions.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.suggestion}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onApprove(item.id)}
                  disabled={item.status !== "pending"}
                  aria-label="Approve suggestion"
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDecline(item.id)}
                  disabled={item.status !== "pending"}
                  aria-label="Decline suggestion"
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
