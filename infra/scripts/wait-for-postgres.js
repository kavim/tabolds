const { exec } = require('node:child_process');

function checkPostgres() {
    exec("docker exec postgres-dev pg_isready --host localhost", handle);

    function handle(error, stdout, stderr) {
        if(stdout.search('accepting connections') === -1 || error) {
            process.stdout.write('.'); 
            checkPostgres();
            return;
        }

        console.log("\n🟢 Postgres is ready");
    }
}

process.stdout.write("\n⏳ Waiting for Postgres to start.");

checkPostgres();