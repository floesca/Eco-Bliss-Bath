const apiOrders = `${Cypress.env("apiUrl")}/orders`

describe("GET /orders", () => {
  it("gets a list of products in the user's basket", () => {
    cy.request({
      method: "GET",
      url: apiOrders,
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })
})


const apiProducts = `${Cypress.env("apiUrl")}/products`
describe("GET /products/:id", () => {
  it("gets the product's detail", () => {
    cy.request("GET", apiProducts).then((response) => {
      const id = response.body[0].id
      const apiProductId = `${Cypress.env("apiUrl")}/products/${id}`

    cy.request("GET", apiProductId).then((productResponse) => {
      expect(productResponse.status).to.eq(200)
      expect(productResponse.body.id).to.eq(id)
    })
    })
  })
})