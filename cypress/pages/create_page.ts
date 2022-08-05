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

    clickOnSave(): HomePage {
        cy.contains('Save').click();
        return new HomePage();
    }

    typeTitle(title: string) {
        cy.get('[formcontrolname="title"]').type(title);
    }

    typeAuthor(author: string) {
        cy.get('[formcontrolname="author"]').type(author);
    }

    typeDesc(desc: string) {
        cy.get('[formcontrolname="description"]').type(desc);
    }

    validateCreatePage() {
        cy.url().should("include", "/create");
        cy.contains("Save");
    }

}