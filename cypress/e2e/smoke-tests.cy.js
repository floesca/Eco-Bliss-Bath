describe("Login page", () => {
    it("contains fields and a button to log in", () => {
        cy.visit("/#/login")
        cy.get('input[type="text"]').should("exist")
        cy.get('input[type="password"]').should("exist")
        cy.contains("Se connecter").click()
    })
})

// présence des boutons d'ajout au panier lorsqu'on est connecté
describe("products page when logged in", () => {
    beforeEach(() => {
    cy.login()
    cy.product()
    })

    it("displays add-to-cart buttons", () => {
    cy.contains("Ajouter au panier").click()
    })
})

// présence de la disponibilté produit
describe("product availability", () => {
    it("should show the availibility on a product's page", () => {
        cy.product()

        cy.get("[data-cy='detail-product-stock']").should("be.visible")
    })
})