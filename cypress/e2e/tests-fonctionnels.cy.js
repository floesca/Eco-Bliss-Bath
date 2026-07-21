// connexion et mon panier visible
describe("connexion", () => {
    it("can connect and show basket button", () => {
        cy.login()

        cy.get("[data-cy='nav-link-cart']").should("be.visible")
    })
})

describe("basket", () => {

   
    it("shows disponibility", () => {
        cy.get("[data-cy='nav-link-cart']").click()
        cy.contains("Disponibilité").should("be.visible")
    })

    it("add-to-cart button should only be visible if product is available", () => {
        cy.visit("/#/products/3") // produit avec un stock négatif
        cy.get("[data-cy='detail-product-add']").should("not.be.visible")
    })

    it("should add a product to the basket then decrease the stock", () => {
       const productId = 5 // produit disponible
       cy.login()
 
        // On intercepte l'appel API pour être sûr que les données sont chargées
        // avant de lire le stock affiché
        cy.intercept("GET", `**/products/${productId}`).as("getProduct")
 
        cy.visit(`/#/products/${productId}`)
        cy.reload()
        cy.wait("@getProduct")
 
        // On lit le stock initial affiché sur la page produit
        cy.get("[data-cy='detail-product-stock']")
            .should(($el) => expect($el.text().trim()).to.match(/\d+/)) // évite de lire un texte vide/pas encore chargé
            .invoke("text")
            .then((stockText) => {
 
                const initialStock = Number(stockText.match(/\d+/)[0])
 
                // On ajoute le produit au panier
                cy.get("[data-cy='detail-product-add']").click()
                cy.wait(5000)
                // On vérifie que le produit est bien dans le panier
                cy.visit("/#/cart")
                cy.get("[data-cy='cart-line']").should("be.visible")
 
                // On revient sur la page produit pour lire le nouveau stock
                cy.intercept("GET", `**/products/${productId}`).as("getProductAgain")
                cy.visit(`/#/products/${productId}`)
                cy.wait("@getProductAgain")
 
                cy.get("[data-cy='detail-product-stock']")
                    .should(($el) => expect($el.text().trim()).to.match(/\d+/))
                    .invoke("text")
                    .then((newStockText) => {
 
                        const newStock = Number(newStockText.match(/\d+/)[0])
 
                        expect(newStock).to.eq(initialStock - 1)
 
                    })
 
            })
 
    })

  })