import retry from 'async-retry';

async function waitForAllServicesToBeReady() {
    await waitForWebServer();

    async function waitForWebServer() {
        return retry(fetchStatusPage, {
            retries: 100,
            minTimeout: 1000,
            factor: 2,
        });

        async function fetchStatusPage() {
            const response = await fetch('http://localhost:3000/api/v1/status');
            
            if (!response.ok) {
                throw new Error('Failed to fetch status page');
            }
        }
    }
}

export default { waitForAllServicesToBeReady };