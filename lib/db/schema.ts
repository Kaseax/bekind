import {pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";

export const acts = pgTable("acts", {
    id: serial("id").primaryKey(),
    act: text("act"),
    created_at: timestamp("created_at").defaultNow(),
});

// TODO: maybe add a boolean column to mark the suggestion as resolved
export const suggestions = pgTable("suggestions", {
    id: serial("id").primaryKey(),
    suggestion: text("suggestion"),
    created_at: timestamp("created_at").defaultNow(),
});