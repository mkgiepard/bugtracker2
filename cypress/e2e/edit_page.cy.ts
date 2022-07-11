describe("The Edit Page", () => {
    beforeEach(() => {
        cy.visit("/edit/1001");
    })

    it("Navigation: successfully loads", () => {
        cy.visit("/edit/1001");
        cy.url().should("include", "/edit/1001");
    });

});