import migrationRunner from 'node-pg-migrate';
import {join} from 'node:path';
import database from 'infra/database';

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationOptions = {
    dbClient: dbClient,
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    direction: 'up',
    log: console.log,
  };

  if(request.method === 'GET') {
    const pendingMigrations = await migrationRunner({...defaultMigrationOptions});
    await dbClient.end();
    return response.status(pendingMigrations > 1 ? 201 : 200).json(pendingMigrations);
  }
  if(request.method === 'POST') {
    const migratedMigrations = await migrationRunner({...defaultMigrationOptions, dryRun: false});
    await dbClient.end();
    return response.status(200).json(migratedMigrations);
  }
}
