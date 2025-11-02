import type { drizzle } from "drizzle-orm/libsql";
import type {} from "hono";

declare module "hono" {
  interface Env {
    Variables: { db: ReturnType<typeof drizzle> };
  }
}
