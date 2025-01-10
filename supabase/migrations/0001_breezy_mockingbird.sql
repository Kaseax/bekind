CREATE TABLE "suggestions" (
	"id" serial PRIMARY KEY NOT NULL,
	"suggestion" text,
	"created_at" timestamp DEFAULT now()
);
