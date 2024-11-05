import { Client } from "pg";

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    return await client.query(queryObject);
  } catch (error) {
    console.error("Error running query", error);
  } finally {
    await client.end();
  }
}

async function info() {
  let max_connections = await query(
    "SELECT sum(numbackends) FROM pg_stat_database;",
  );

  let version = await query("SHOW server_version;");
  let dbName = process.env.POSTGRES_USER;
  let openedConnections = await query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName],
  });

  let dbinfo = {
    status: "ok",
    database: "postgres",
    version: version.rows[0].server_version,
    max_connections: parseInt(max_connections.rows[0].sum),
    openedConnections: openedConnections.rows[0].count,
  };

  return dbinfo;
}

async function getNewClient() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    ssl: process.env.NODE_ENV === 'production' ? true : false
  });

  await client.connect();
  return client;
}

export default {
  query,
  info,
  getNewClient,
};
