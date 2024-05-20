import { HomePage } from './home_page';

export class LoginPage {

    open() {
        cy.visit("/login");
    }

    loginWithTestUser(): HomePage {
        cy.get("[formcontrolname='username']").type(Cypress.env('testUser'));
        cy.get("[formcontrolname='password']").type(Cypress.env('testUserPwd'));
        cy.get('button:contains("Login")').click();
        cy.wait(1000);
        return new HomePage();
    }
}