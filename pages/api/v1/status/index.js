import database from "infra/database";

async function status(request, response) {
  try {
    const dbInfo = await database.info();
    response
      .status(200)
      .json({
        updated_at: new Date().toISOString(),
        dependencies: { database: dbInfo },
      });
  } catch (error) {
    console.error("Status endpoint error:", error);
    response
      .status(500)
      .json({ error: "Failed to get system status", details: error.message });
  }
}

export default status;
