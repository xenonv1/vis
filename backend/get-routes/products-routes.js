const dbConnector = require("../db-connector");

function returnProductsInformation(req, res) {
    try {
    const products = dbConnector.queryDataSet("products");

    res.status(200).send(products);
    }
    catch(e) {
        res.status(500).send(e);
    }
}

function returnProductInformationById(req, res) {
    try {
        const product = dbConnector.querySingleItem("product", req.params.id);

        res.status(200).send(product);
    }
    catch(e) {
        res.status(500).send(e);
    }
}

module.exports = {returnProductsInformation, returnProductInformationById};