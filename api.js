const express = require('express');

const app = express();

const ipAddr = "127.0.0.1";
const port = 8000;

/* - - - server - - - */

app.listen(ipAddr, port, () => {
    console.log(`Now listening on ${ipAddr}:${port}...`);
});

/* - - - endpoints - - - */