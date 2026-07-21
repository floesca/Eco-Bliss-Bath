// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", () => {

  cy.visit("/#/login")

  cy.get('[data-cy="login-input-username"]').type("test2@test.fr")

  cy.get('[data-cy="login-input-password"]').type("testtest")

  cy.get("[data-cy='login-submit']")
      .click()

  cy.get('[data-cy="nav-link-logout"]', { timeout: 10000 }).should("be.visible");
})

Cypress.Commands.add("product", () => {
    const apiProducts = `${Cypress.env("apiUrl")}/products`
  cy.request("GET", apiProducts).then((response) => {
      const products = response.body

      const randomProduct = products[
        Math.floor(Math.random() * products.length)
      ]

      const productId = randomProduct.productId

      cy.visit(`/#/products/${productId}`)
    })
  })