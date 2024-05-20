import { HomePage } from '../pages/home_page';
import { EditPage } from '../pages/edit_page';
import { LoginPage } from '../pages/login_page';

const homePage = new HomePage();

describe('The Home Page', () => {
  beforeEach(() => {
    const login = new LoginPage();
    login.open();
    login.loginWithTestUser();

    homePage.open();
  });

  it('Navigation: successfully loads', () => {
    homePage.open();
  });

  it('Navigation: FAB should open new bug report page', () => {
    homePage.clickFAB();
  });

  it('Navigation: click on a title should open bug report view page', () => {
    homePage.clickOnBugTitle('bug report 2');
  });

  it('Navigation: click on a edit button should open bug report edit page', () => {
    const edit = homePage.clickOnEditInRow(2);
    edit.validateEditPageForId(2);
  });

  it("Action: click on 'up' should increase a bug priority", () => {
    homePage.clickOnUpPriorityInRow(2);
    homePage.validatePriorityInRow(2, 0);
  });

  it("Action: click on 'down' should decrease a bug priority", () => {
    homePage.clickOnDownPriorityInRow(1);
    homePage.validatePriorityInRow(1, 1);
  });
});
