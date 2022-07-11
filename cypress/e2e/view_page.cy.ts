describe("The View Page", () => {
    beforeEach(() => {
        cy.visit("/view/1001");
    })

    it("Navigation: successfully loads", () => {
        cy.visit("/view/1001");
        cy.url().should("include", "/view/1001");
    });

});