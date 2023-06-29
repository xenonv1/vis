const dbConnector = require("../db-connector");

function returnServicesInformation(req, res) {
    try {
    const services = dbConnector.queryDataSet("services");

    res.status(200).send(services);
    }
    catch(e) {
        res.status(500).send(e);
    }
}

function returnServiceInformationById(req, res) {
    try {
        const service = dbConnector.querySingleItem("service", req.params.id);

        res.status(200).send(service);
    }
    catch(e) {
        res.status(500).send(e);
    }
}

module.exports = {returnServicesInformation, returnServiceInformationById};