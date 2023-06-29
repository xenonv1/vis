function returnHealthInformation(req, res) {
    res.status(200).send("Health check: Application is working as intended.");
}

module.exports = returnHealthInformation;