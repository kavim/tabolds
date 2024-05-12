import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1+1");
  console.log(result.rows);

  response.status(200).json({
    status: "ON THE LINE",
    message: "Hello World!",
  });
}

export default status;
