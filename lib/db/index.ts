import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";
import { getCloudflareBindings } from "@/lib/env";
import { createRequire } from "node:module";

const nodeRequire = createRequire(import.meta.url);

export type AppDatabase = ReturnType<typeof drizzle<typeof schema>>;

let cachedLocalDb: AppDatabase | null = null;

/**
 * Returns a Drizzle ORM client connected to Cloudflare D1.
 * In Cloudflare Workers: Uses the native D1 binding (`bindings.DB`).
 * In Node.js (development / testing): Seamlessly falls back to local D1 SQLite file.
 */
export function getDb(customD1?: D1Database): AppDatabase {
  if (customD1) {
    return drizzle(customD1, { schema });
  }

  const bindings = getCloudflareBindings();
  if (bindings.DB) {
    return drizzle(bindings.DB, { schema });
  }

  if (cachedLocalDb) {
    return cachedLocalDb;
  }

  try {
    const nodeProcess = typeof process !== "undefined" ? (process as unknown as { getBuiltinModule?: (name: string) => Record<string, unknown> }) : undefined;
    const sqliteModule = (typeof nodeProcess?.getBuiltinModule === "function")
      ? nodeProcess.getBuiltinModule("node:sqlite")
      : (nodeRequire("node:sqlite") as Record<string, unknown>);

    const { DatabaseSync } = sqliteModule as unknown as { DatabaseSync: new (path: string) => unknown };
    const path = nodeRequire("node:path");
    const fs = nodeRequire("node:fs");

    const localDbPath = path.resolve(
      process.cwd(),
      ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/9ba2b04bf514d9facfd57ed57d849e77241a7adc99d1c1545d06688b43d84248.sqlite"
    );

    let sqliteInstance: InstanceType<typeof DatabaseSync>;
    if (fs.existsSync(localDbPath)) {
      sqliteInstance = new DatabaseSync(localDbPath);
    } else {
      sqliteInstance = new DatabaseSync(":memory:");
    }

    class D1Stmt {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(private rawStmt: any, private params: unknown[] = []) {}
      bind(...params: unknown[]) {
        return new D1Stmt(this.rawStmt, params);
      }
      async all() {
        const results = this.rawStmt.all(...this.params);
        return { results, success: true, meta: {} };
      }
      async run() {
        const info = this.rawStmt.run(...this.params);
        return {
          success: true,
          meta: { changes: info.changes, last_row_id: Number(info.lastInsertRowid) },
        };
      }
      async raw() {
        const rows = this.rawStmt.all(...this.params);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return rows.map((r: any) => Object.values(r));
      }
      async first(colName?: string) {
        const rows = this.rawStmt.all(...this.params);
        if (!rows || rows.length === 0) return null;
        const row = rows[0] as Record<string, unknown>;
        return colName ? row[colName] : row;
      }
    }

    class D1DbShim {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(private db: any) {}
      prepare(query: string) {
        return new D1Stmt(this.db.prepare(query));
      }
      async batch(stmts: D1Stmt[]) {
        return Promise.all(stmts.map((s) => s.all()));
      }
      async exec(query: string) {
        this.db.exec(query);
        return { count: 0, duration: 0 };
      }
    }

    const d1Shim = new D1DbShim(sqliteInstance) as unknown as D1Database;
    cachedLocalDb = drizzle(d1Shim, { schema });
    return cachedLocalDb;
  } catch (err) {
    throw new Error(`[Projukti Labs] D1 Database binding not found and local SQLite fallback failed: ${err}`);
  }
}
