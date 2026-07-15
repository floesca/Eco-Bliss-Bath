const apiOrders = `${Cypress.env("apiUrl")}/orders`
const apiLogin = `${Cypress.env("apiUrl")}/login`
describe("GET /orders", () => {
  it("shouldn't get a list of products in the user's basket if not connected", () => {
    cy.request({
      method: "GET",
      url: apiOrders,
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

     let token
    before(() => {
      cy.request({
        method: "POST",
        url: apiLogin,
        body: {
          username: "test2@test.fr",
          password: "testtest"
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        token = response.body.token
      })
    })

  it("should get a list of the products in the user's basket if connected", () => {
    cy.request({
      method: "GET",
      url: apiOrders,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
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

describe("POST /login", () => {
  it("should authenticate a valid user", () => {
    cy.request({
        method: "POST", 
        url: apiLogin,
        body: {
          username: "test2@test.fr",
          password: "testtest"
        }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it("should reject unknown user", () => {
    cy.request({
        method: "POST", 
        failOnStatusCode: false,
        url: apiLogin,
        body: {
          username: "test2@test.fr",
          password: "mauvaisMotDePasse"
        }
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })
})

const apiAdd = `${Cypress.env("apiUrl")}/orders/add`
describe("POST /orders/add", () => {
   let token
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: apiLogin,
      body: {
        username: "test2@test.fr",
        password: "testtest"
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      token = response.body.token
    })
  })

  it("should add an available product to the basket", () => {
    cy.request({
      method: "PUT",
      failOnStatusCode: false,
      url: apiAdd,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        product: 5,
        quantity: 1
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it("should not add an unavailble product to the basket", () => {
    cy.request({
      method: "PUT",
      failOnStatusCode: false,
      url: apiAdd,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        product: 3,
        quantity: 1
      }
    }).then((response) => {
      expect(response.status).to.eq(403)
    })
  })
})

const apiReviews = `${Cypress.env("apiUrl")}/reviews`
describe("POST /reviews", () => {
    let token
  before(() => {
    cy.request({
      method: "POST",
      url: apiLogin,
      body: {
        username: "test2@test.fr",
        password: "testtest"
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      token = response.body.token
    })
  })

  it("adds a review", () => {
    cy.request({
      method: "POST",
      url: apiReviews,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        title: "Test",
        comment: "Test",
        rating: 5
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})

