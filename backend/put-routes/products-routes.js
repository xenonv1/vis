const dbConnector = require("../db-connector");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.json());

function updateProduct(req, res) {
    const data = req.body;

    const queryResponse = dbConnector.updateExistingEntry("product", data);

    if(queryResponse === 200) {
        res.status(200).send(`Product ${data.name} was updated successfully.`);
    }
    else if(queryResponse === 404){
        res.status(200).send(`Product ${data.name} could not be found.`);
    }
    else {
        res.status(500).send("An error occured. Please try again later or reach out to the administration");
    }
}