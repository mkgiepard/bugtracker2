export class ViewPage {

    clickOnDelete() {
        cy.get('mat-icon').eq(5).click();
        cy.url().should("include", "/list");
    }

}