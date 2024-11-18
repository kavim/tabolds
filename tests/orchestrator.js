import retry from "async-retry";
import database from "infra/database.js";

console.log("\n\n🛞 Orchestrator loaded\n\n");

async function waitForAllServices() {
  // await waitForWebServer();
  await fetchStatusPage();

  // async function waitForWebServer() {
  //   return retry(fetchStatusPage, {
  //     retries: 10,
  //     maxTimeout: 2000,
  //     factor: 2,
  //     onRetry: (err, attempt) => {
  //       console.log(`Attempt ${attempt} failed: ${err.message}`);
  //     },
  //   });

  //   async function fetchStatusPage() {
  //     const response = await fetch("http://127.0.0.1:3000/api/v1/status");

  //     if (response.status !== 200) {
  //       throw new Error(`Unexpected status code: ${JSON.stringify(response)}`);
  //     }
  //   }
  // }

  async function fetchStatusPage() {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/status");

      console.log("Response: ", response);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
};

export default orchestrator;
