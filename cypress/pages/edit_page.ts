import { HomePage } from "./home_page";

export class EditPage {

    open(id: number) {
        cy.visit("/edit/" + id);
        cy.url().should("include", "/edit/" + id);
    }

    clickOnDelete() {
        cy.get('mat-icon').eq(5).click();
        cy.url().should("include", "/list");
    }

    clickOnBack() {
        cy.contains('Back').click();
        return new HomePage();
    }

    validateEditPage() {
        cy.url().should("include", "/edit");
        cy.contains("Save");
    }

}