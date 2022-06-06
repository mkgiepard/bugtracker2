describe("The Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  })

  it("Navigation: successfully loads", () => {
    cy.visit("/");
    cy.url().should("include", "/list");
  });

  it("Navigation: FAB should open new bug report page", () => {
    cy.contains("add").click();
    cy.url().should("include", "/create");
  });

  it("Navigation: click on a title should open bug report view page", () => {
    cy.contains("bug report 1").click();
    cy.url().should("include", "/view");
  });
});
