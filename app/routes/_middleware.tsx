import { drizzle } from "drizzle-orm/libsql";
import { createRoute } from "honox/factory";

export default createRoute(async (c, next) => {
  c.set("db", drizzle("file:local.db"));
  await next();
});
