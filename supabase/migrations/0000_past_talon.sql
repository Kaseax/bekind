CREATE TABLE "acts" (
	"id" serial PRIMARY KEY NOT NULL,
	"act" text,
	"created_at" timestamp DEFAULT now()
);
