const express = require('express');

const app = express();

const ipAddr = "127.0.0.1";
const port = 8000;

/* - - - server - - - */

app.listen(port,ipAddr, () => {
    console.log(`Now listening on ${ipAddr}:${port}...`);
});

/* - - - endpoints - - - */

app.get('/products', (req, res) => {
    res.json(products);
  });