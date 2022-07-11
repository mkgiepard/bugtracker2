describe("The Create Page", () => {
    beforeEach(() => {
        cy.visit("/create");
    })

    it("Navigation: successfully loads", () => {
        cy.visit("/create");
        cy.url().should("include", "/create");
    });

});