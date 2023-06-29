const express = require("express");
const cors = require("cors");
const healthRoute = require("./get-routes/health-routes");
const productsRoutesGet = require("./get-routes/products-routes");
const servicesRoutesGet = require("./get-routes/services-routes");

const app = express();
app.use(cors());

const ipAddr = "127.0.0.1";
const port = 8000;

app.listen(port, ipAddr, () => {
    console.log(`Now listening on ${ipAddr}:${port}...`);
  });

const router = express.Router();

router.get("/api/health", healthRoute);
router.get("/api/products", productsRoutesGet.returnProductsInformation);
router.get("/api/products/:id", productsRoutesGet.returnProductInformationById);
router.get("/api/services", servicesRoutesGet.returnServicesInformation);
router.get("/api/services/:id", servicesRoutesGet.returnServiceInformationById);

app.use("/", router);


