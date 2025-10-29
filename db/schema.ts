import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const photosTable = sqliteTable("photos", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  place: text().notNull(),
  url: text().notNull(),
  createdAt: int({ mode: "timestamp" }).notNull(),
  updatedAt: int({ mode: "timestamp" })
    .default(sql`current_timestamp`)
    .notNull(),
});

export type InsertPhoto = typeof photosTable.$inferInsert;
export type SelectPhoto = typeof photosTable.$inferSelect;
