describe("test xss", () => {
    it("should not execute the script", () => {
        cy.login()
        cy.wait(3000)
        cy.visit("/#/reviews")

        cy.on("window:alert", (message) => {
            throw new Error(`Faille XSS détectée : ${message}`)
        })

        cy.get("[data-cy='review-input-rating-images'] img").eq(4).click()
        cy.get("[data-cy='review-input-title']").type("Test XSS")
        cy.get("[data-cy='review-input-comment']").type("<script>alert('faille XSS')</script>")
        cy.get("[data-cy='review-submit']").click()
        cy.contains("<script>alert('faille XSS')</script>").should("not.exist")
    })
})
