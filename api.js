const express = require('express');
const fs = require('fs');

const app = express();

const ipAddr = "127.0.0.1";
const port = 8000;

/* - - - server - - - */

app.listen(port,ipAddr, () => {
    console.log(`Now listening on ${ipAddr}:${port}...`);
});

/* - - - endpoints - - - */

app.get('/products', (req, res) => {
    fs.readFile('products.json', 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            return req.statusCode(500), send('Error reading Products');
        }
        const products = JSON.parse(data);
        res.json(products);
    });
  });