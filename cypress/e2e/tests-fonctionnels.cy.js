// connexion et mon panier visible
describe("login", () => {
    it("can log in and show cart button", () => {
        cy.login()

        cy.get("[data-cy='nav-link-cart']").should("be.visible")
    })

    it("cannot log in with wrong credentials ", () => {
        cy.visit("/#/login")

        cy.get('[data-cy="login-input-username"]').type("mauvaistest@test.fr")

        cy.get('[data-cy="login-input-password"]').type("mauvaistest")

        cy.get("[data-cy='login-submit']").click()

        cy.wait(3000)

        cy.get("[data-cy='login-errors']").should("be.visible")
    })
})

describe("cart", () => {

   
    it("shows disponibility", () => {
        cy.get("[data-cy='nav-link-cart']").click()
        cy.contains("Disponibilité").should("be.visible")
    })

    it("add-to-cart button should only be visible if product is available", () => {
        cy.visit("/#/products/3") // produit avec un stock négatif
        cy.get("[data-cy='detail-product-add']").should("not.be.visible")
    })

    it("should add a product to the cart then decrease the stock", () => {
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

// disponibilté si authentifié
describe("product availability if logged in", () => {
    it("should show availability if user is logged in", () => {
        cy.login()
        cy.product()

        cy.get("[data-cy='detail-product-stock']").should("be.visible")
    })
})  