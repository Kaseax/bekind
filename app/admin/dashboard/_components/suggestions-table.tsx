import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Suggestion = {
  id: number
  suggestion: string
  status: "pending" | "approved" | "declined"
}

interface SuggestionsTableProps {
  suggestions: Suggestion[];
  onApprove: (id: number) => void;
  onDecline: (id: number) => void;
}

export function SuggestionsTable({ suggestions, onApprove, onDecline }: SuggestionsTableProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <ScrollArea className="h-[400px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Suggestion</TableHead>
              <TableHead className="w-[25%]">Status</TableHead>
              <TableHead className="text-right w-[25%]">Actions</TableHead>
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
      </ScrollArea>
    </div>
  );
}

