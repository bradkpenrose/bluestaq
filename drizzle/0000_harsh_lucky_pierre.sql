CREATE TABLE "note" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"userId" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
