const request = require("supertest");
const app = require("./api"); // Import your app, assuming it's exported in 'app.js'

describe("PUT /v2/products/create", () => {
  it("should create a new product and return 201", async () => {
    const newProduct = {
      name: "Test Product",
      brand: "Test Brand",
      color: "Red",
      size: "L",
      weight: "1.5",
      description: "Test product description",
      category: "Test Category",
      prices: [
        {
          validFrom: "07.05.2020",
          validTo: "07.05.2021",
          price: "1385.68",
        },
      ],
      discounted: false,
      discountAmount: 0,
      stock: 10,
      packagingSize: "10x10x10",
      packagingWeight: "1.0",
      discontinued: false,
    };

    const response = await request(app)
      .put("/v2/products/create")
      .send(newProduct);

    expect(response.status).toBe(201);
    expect(response.text).toBe(
      `Product ${newProduct.name} was successfully created.`
    );
  });
});
