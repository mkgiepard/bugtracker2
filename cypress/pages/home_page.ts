export class HomePage {

    open() {
        cy.visit("/");
    }

    clickFAB() {
        cy.contains("add").click();
        cy.url().should("include", "/create");
    }

    clickOnBugTitle(title: string) {
        cy.contains(title).click();
        cy.url().should("include", "/view");
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