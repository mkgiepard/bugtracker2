import { HomePage } from "./home_page";

export class ViewPage {

    open(id: number) {
        cy.visit("/view/" + id);
        cy.url().should("include", "/view/" + id);
    }

    clickOnDelete() {
        cy.get('mat-icon:contains("delete")').click();
        cy.url().should("include", "/list");
    }

    clickOnBack(): HomePage {
        cy.get('button:contains("Back")').click();
        return new HomePage();
    }

    validateViewPage() {
        cy.url().should("include", "/view");
        cy.contains("Edit");
    }

}