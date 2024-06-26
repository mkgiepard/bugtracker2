import { AddCommentPage } from './add_comment_page';
import { CreatePage } from './create_page';
import { EditPage } from './edit_page';
import { ViewPage } from './view_page';

export class HomePage {

    HomePage() {
        cy.contains("add");
    }

    open() {
        cy.visit("/");
    }

    clickFAB(): CreatePage {
        cy.contains("add").click();
        cy.url().should("include", "/create");
        return new CreatePage();
    }

    clickOnBugTitle(title: string): ViewPage {
        cy.contains(title).click();
        cy.url().should("include", "/view");
        return new ViewPage();
    }

    clickOnAddCommentInRow(row: number): AddCommentPage {
        cy.get('tr').eq(row).within(() => {
            cy.get('mat-icon').eq(0).click();
            cy.url().should("include", "/comment");
        });
        return new AddCommentPage();
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