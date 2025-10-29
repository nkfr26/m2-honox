import type { Client } from "@libsql/client";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import type {} from "hono";

type DrizzleClient = LibSQLDatabase<Record<string, never>> & {
  $client: Client;
};

declare module "hono" {
  interface Env {
    Variables: { db: DrizzleClient };
  }
}
