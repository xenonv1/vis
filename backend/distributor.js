const axios = require("axios");

function distributeRequest(headers) {
  const teamName = headers["team-name"];
  const teamEndpoint = headers["team-endpoint"];

  switch (teamName.trim()) {
    case "neverovertime":
      {
        switch (teamEndpoint.trim()) {
          case "products":
            return getProducts();
          case "services":
            return getServices();
        }
      }
      break;
    case "404":
      {
        switch (teamEndpoint.trim()) {
          case "skills":
            return getSkills();
          case "incidents":
            return getIncidents();
          case "planning":
            return getPlanning();
          case "technicians":
            return getTechnicians();
        }
      }
      break;
    case "pizza":
      {
        switch (teamEndpoint.trim()) {
          case "orders":
            return getOrders();
          case "carts":
            return getShoppingCarts();
        }
      }
      break;
    case "colada":
      {
        switch (teamEndpoint.trim()) {
          case "customers":
            return getCustomers();
          case "addresses":
            return getAddresses();
          case "users":
            return getUsers();
          case "roles":
            return getRoles();
        }
      }
      break;
  }
  return "oops, something went wrong :(";
}

//#region - - - requests team never overtime. - - -
const ipNeverOvertime = "192.168.0.100";
const portNeverOvertime = "8000";

const baseUrlNO = `http://${ipNeverOvertime}:${portNeverOvertime}`;

async function getProducts() {
  let response;

  try {
    response = await axios.get(`${baseUrlNO}/v2/products`);
  } catch (e) {
    response = "Fetching products returned with the following error: " + e;
  }

  return response;
}

async function getServices() {
  let response;

  try {
    response = await axios.get(`${baseUrlNO}/v2/services`);
  } catch (e) {
    response = "Fetching services returned with the following error: " + e;
  }

  return response;
}

async function getProductById(id) {
  const response = await axios.get(`${baseUrlNO}/v2/products/${id}`);

  return response;
}

async function getServiceById(id) {
  const response = await axios.get(`${baseUrlNO}/v2/services/${id}`);

  return response;
}
//#endregion

//#region - - - requests team 404 - - -

const ip404 = "192.168.0.107";
const port404 = "404";

const baseUrl404 = `http://${ip404}:${port404}`;

async function getIncidents() {
  let response;

  try {
    response = await axios.get(`${baseUrl404}/api/incidents`);
  } catch (e) {
    response = "Fetching incidents returned with the following error: " + e;
  }
  return response;
}

async function getPlanning() {
  let response;

  try {
    response = await axios.get(`${baseUrl404}/api/planning`);
  } catch (e) {
    response = "Fetching planning data returned with the following error: " + e;
  }

  return response;
}

async function getSkills() {
  let response;

  try {
    response = await axios.get(`${baseUrl404}/api/skills`);
  } catch (e) {
    response = "Fetching skills returned with the following error: " + e;
  }

  return response;
}

async function getTechnicians() {
  let response;

  try {
    response = await axios.get(`${baseUrl404}/api/technicians`);
  } catch (e) {
    response = "Fetching technicians returned with the following error: " + e;
  }

  return response;
}

function postIncidentData() {
  const data = {
    name: "Etwas ist gabutt gegangen",
    product: "Mikrowelle",
    customer: 1,
    description: "Löffel war noch in Schüssel",
    skills: ["646f58ec7a1bc2b6f0b350ec"],
    priority: "low",
    serviceEmployee: 1,
  };

  axios.put(`${baseUrl404}/api/incidents`, data);
}

//postIncidentData();

//#endregion

//#region - - - requests team pizza - - -
const ipPizza = "192.168.0.102";
const portPizza = "8080";

const baseUrlPizza = `${ipPizza}:${portPizza}`;

async function getOrders() {
  let response;

  try {
    response = await axios.get(`http://${baseUrlPizza}/carts`);
  } catch (e) {
    response = "Fetching orders returned with the following error: " + e;
  }

  return response;
}

async function getShoppingCarts() {
  let response;

  try {
    response = await axios.get(`http://${baseUrlPizza}/orders`);
  } catch (e) {
    response =
      "Fetching shopping carts returned with the following error: " + e;
  }

  return response;
}

//#endregion

//#region - - - requests team colada - - -
const ipColada = "192.168.0.101";
const portColada = "8000";

const baseUrlColada = `http://${ipColada}:${portColada}`;

async function getCustomers() {
  let response;

  try {
    response = await axios.get(`${baseUrlColada}/customers`);
  } catch (e) {
    response = "Fetching customers returned with the following error: " + e;
  }

  return response;
}

async function getAddresses() {
  let response;

  try {
    response = await axios.get(`${baseUrlColada}/addresses`);
  } catch (e) {
    response = "Fetching addresses returned with the following error: " + e;
  }

  return response;
}

async function getUsers() {
  let response;

  try {
    response = await axios.get(`${baseUrlColada}/users`);
  } catch (e) {
    response = "Fetching users returned with the following error: " + e;
  }

  return response;
}

async function getRoles() {
  let response;

  try {
    response = await axios.get(`${baseUrlColada}/roles`);
  } catch (e) {
    response = "Fetching roles returned with the following error: " + e;
  }

  return response;
}

//#endregion

module.exports = distributeRequest;
