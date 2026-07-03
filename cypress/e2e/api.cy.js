const apiOrders = `${Cypress.env("apiUrl")}/orders`

context("GET /orders", () => {
  it("gets a list of products in the user's basket", () => {
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

const apiRandomProducts = `${Cypress.env("apiUrl")}/products/random`

context("GET /products/random", () => {
  it("gets a list of 3 random products", () => {
    cy.request("GET", apiRandomProducts).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length(3)
    })
  })
})

const apiReviews = `${Cypress.env("apiUrl")}/reviews`

context("GET /reviews", () => {
  it("gets the comments posted on the site", () => {
    cy.request("GET", apiReviews).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).length.to.be.greaterThan(2)
    })
  })
})


context("GET /products/:id", () => {
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