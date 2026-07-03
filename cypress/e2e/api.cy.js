const apiOrders = `${Cypress.env("apiUrl")}/orders`

context("GET /orders", () => {
  it("gets a list of products in the user's basket without being logged in", () => {
    cy.request({
      method: "GET",
      url: apiOrders,
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  })
})

const apiProducts = `${Cypress.env("apiUrl")}/products`

context("GET /products", () => {
  it("gets a list of products", () => {
    cy.request("GET", apiProducts).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).length.to.be.greaterThan(1)
    })
  })
})