import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "@shared/schema";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL && process.env.DATABASE_URL !== "postgresql://placeholder:placeholder@localhost:5432/placeholder") {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
} else {
  console.log("[DB] No DATABASE_URL configured — running with in-memory storage");
}

export { pool, db };
