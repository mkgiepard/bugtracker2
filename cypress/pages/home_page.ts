import { EditPage } from './edit_page';
import { ViewPage } from './view_page';

export class HomePage {

    open() {
        cy.visit("/");
    }

    clickFAB() {
        cy.contains("add").click();
        cy.url().should("include", "/create");
    }

    clickOnBugTitle(title: string): ViewPage {
        cy.contains(title).click();
        cy.url().should("include", "/view");
        return new ViewPage();
    }

    clickOnEditInRow(row: number): EditPage {
        cy.get('tr').eq(row).within(() => {
            cy.get('mat-icon').eq(1).click();
            cy.url().should("include", "/edit");
        });
        return new EditPage();
    }

    clickOnUpPriorityInRow(row: number) {
        cy.get('tr').eq(row).within(() => {
            cy.get('mat-icon').eq(4).click();
        })
    }

    clickOnDownPriorityInRow(row: number) {
        cy.get('tr').eq(row).within(() => {
            cy.get('mat-icon').eq(5).click();
        })
    }

    clickOnDeleteInRow(row: number) {
        cy.get('tr').eq(row).within(() => {
            cy.get('mat-icon').eq(6).click();
        })
    }

    validateNumberOfRows(rows: number) {
        cy.get('tr').should('have.length', rows);
    }


    validateHomePage() {
        cy.url().should("include", "/list");
        cy.contains("add");
        return this;
    }

    validatePriorityInRow(row: number, priority: number) {
        cy.get('tr').eq(row).get('td').eq(2).invoke('text').then(parseFloat).should('be.eq', priority);
        return this;
    }
}