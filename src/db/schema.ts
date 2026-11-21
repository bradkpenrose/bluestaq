import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const noteTable = pgTable("note", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  userId: text("userId").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Note = typeof noteTable.$inferSelect;
