// connexion et mon panier visible
describe("connexion", () => {
    it("can connect and show basket button", () => {
        cy.login()

        cy.get("[data-cy='nav-link-cart']").should("be.visible")
    })
})

describe("basket", () => {

    beforeEach(() => {
        cy.login()
    })
    
    it("shows disponibility", () => {
        cy.get("[data-cy='nav-link-cart']").click()
        cy.contains("Disponibilité").should("be.visible")
    })

    it("add-to-cart button should only be visible if product is available", () => {
        cy.visit("/#/products/3") // produit avec un stock négatif
        cy.get("[data-cy='detail-product-add']").should("not.be.visible")
    })

    it("should add a product to the basket then decrease the stock", () => {
        cy.visit("/#/products/5")
        cy.get("[data-cy='detail-product-stock']")
        .invoke("text")
        .then((stockText) => {

            const initialStock = Number(stockText.match(/\d+/)[0])

            cy.get("[data-cy='detail-product-add']").click()

            cy.visit("/#/cart")
            cy.get("[data-cy='cart-line']").should("be.visible")

            cy.reload()

            cy.get("[data-cy='detail-product-stock']")
            .invoke("text")
            .then((newStockText) => {

                const newStock = Number(newStockText.match(/\d+/)[0])

                expect(newStock).to.eq(initialStock - 1)

            })

        })

  })

})