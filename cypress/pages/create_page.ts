import { HomePage } from './home_page';

export class CreatePage {

    open() {
        cy.visit("/create");
        cy.url().should("include", "/create");
    }

    clickOnCancel(): HomePage {
        cy.contains('Cancel').click();
        return new HomePage();
    }

    validateCreatePage() {
        cy.url().should("include", "/create");
        cy.contains("Save");
    }

}