import { HomePage } from './home_page';

export class EditPage {
  open(id: number) {
    cy.visit('/edit/' + id);
    cy.url().should('include', '/edit/' + id);
  }

  clickOnDelete() {
    cy.get('mat-icon').eq(5).click();
    cy.url().should('include', '/list');
  }

  clickOnBack(): HomePage {
    cy.contains('Back').click();
    return new HomePage();
  }

  clickOnSave(): HomePage {
    cy.contains('Save').click();
    return new HomePage();
  }

  updateTitle(newTitle: string) {
    cy.get("[formcontrolname='title']").clear();
    cy.get("[formcontrolname='title']").type(newTitle);
  }

  validateEditPage() {
    cy.url().should('include', '/edit');
    cy.contains('Save');
  }

  validateEditPageForId(id: number) {
    const idWithOffset = 1000 + id;
    this.validateEditPage();
    cy.url().should('include', '/edit/' + idWithOffset);
  }
}
