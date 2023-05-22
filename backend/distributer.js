const axios = require("axios");

//#region - - - requests team never overtime. - - -

const ipNeverOvertime = "127.0.0.1";
const portNeverOvertime = "8000";

async function getProducts() {
  const response = await axios.get(
    `${ipNeverOvertime}:${portNeverOvertime}/v2/products`
  );

  return response;
}

async function getServices() {
  const response = await axios.get(
    `${ipNeverOvertime}:${portNeverOvertime}/v2/services`
  );

  return response;
}

async function getProductById(id) {
  const response = await axios.get(
    `${ipNeverOvertime}:${portNeverOvertime}/v2/products/${id}`
  );

  return response;
}

async function getServiceById(id) {
  const response = await axios.get(
    `${ipNeverOvertime}:${portNeverOvertime}/v2/services/${id}`
  );

  return response;
}

//#endregion

//#region - - - requests team 404 - - -

const ip404 = "";
const port404 = "";

//#endregion
