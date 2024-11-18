import database from "infra/database";

async function status(request, response) {
  response.status(200).json({
    updated_at: new Date().toISOString(),
    dependencies: {
      database: await database.info(),
    },
  });
}

export default status;
