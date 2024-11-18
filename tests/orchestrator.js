import retry from "async-retry";

const orchestrator = async function waitForAllServicesToBeReady() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 3,
      minTimeout: 1000,
      factor: 2,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (!response.ok) {
        throw new Error("Failed to fetch status page");
      }
    }
  }
};

export default orchestrator;
