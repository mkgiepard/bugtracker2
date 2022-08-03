import { HomePage } from './home_page';

export class AddCommentPage {

    open(id: number) {
        cy.visit("/comment/" + id);
        cy.url().should("include", "/comment/" + id);
    }

    clickOnBack(): HomePage {
        cy.contains('Back').click();
        return new HomePage();
    }

    validateAddCommentPage() {
        cy.url().should("include", "/comment");
        cy.contains("Save");
    }
}