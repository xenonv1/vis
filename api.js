const express = require('express');
const app = express();
const fs = require('fs');

const ipAddr = "127.0.0.1";
const port = 8000;

/* - - - server - - - */

app.listen(port, ipAddr, () => {
    console.log(`Now listening on ${ipAddr}:${port}...`);
});

/* - - - endpoints - - - */

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }
        const products = JSON.parse(data);
        const product = products.find(p => p.id === id);
        if (!product) {
            res.status(404).send('Product not found');
            return;
        }
        res.json(product);
    });
});