// connexion et mon panier visible
describe("connexion", () => {
    it("can connect and show basket button", () => {
        cy.login()

        cy.get("[data-cy='nav-link-cart']")
        .should("be.visible")
    })
})

// en étant connecté,
describe("basket", () => {
    // vérifier un champ de disponibilité 
    it("shows disponibility", () => {
        cy.login()

        cy.get("[data-cy='nav-link-cart']").click()

        cy.contains("Disponibilité").should("be.visible")
    })
})

// cliquer sur un des produits, le stock doit étre supérieur à un pour être ajouté
// cliquer sur ajouter au panier,
// le produit a été ajouté au panier,
// le nombre du stock a diminué du nombre de produits ajoutés au panier,
// vérifier les limites
