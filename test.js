const run = async () => {
    console.error("Running query ...");
    const alfy = require('alfy-test')();
    const result = await alfy('String');
    console.log(JSON.stringify(result));
}

run();
