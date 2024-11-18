import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  console.log("Migration endpoint invoked.");

  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response
      .status(405)
      .json({ error: `Method ${request.method} not allowed` });
  }

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set.");
    return response.status(500).json({ error: "Server misconfiguration." });
  }

  const dbClient = await database.getNewClient();
  const defaultMigrationOptions = {
    dbClient: dbClient,
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    direction: "up",
    log: console.log,
  };

  try {
    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner({
        ...defaultMigrationOptions,
      });
      return response
        .status(pendingMigrations > 1 ? 201 : 200)
        .json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });
      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    return response.status(500).json({ error: "Migration operation failed." });
  } finally {
    if (dbClient) {
      await dbClient.end();
    }
  }
}
