import { EditPage } from '../pages/edit_page';
import { HomePage } from '../pages/home_page';
import { ViewPage } from '../pages/view_page';
import { LoginPage } from '../pages/login_page';


const homePage = new HomePage();

describe("Verify bug deletion", () => {

    beforeEach(() => {
        const login = new LoginPage();
        login.open();
        login.loginWithTestUser();

        homePage.open();
    })

    it("Delete bug from home page (/list)", () => {
        // Number of issues + table header
        homePage.validateNumberOfRows(8);
        homePage.clickOnDeleteInRow(1);
        homePage.validateNumberOfRows(7);
    });

    it("Delete bug from view page (/view/:id)", () => {
        // Number of issues + table header
        homePage.validateNumberOfRows(8);
        var viewPage: ViewPage = homePage.clickOnBugTitle('bug report 5');
        viewPage.clickOnDelete();
        homePage.validateNumberOfRows(7);
    });

    it("Delete bug from edit page (/edit/:id)", () => {
        // Number of issues + table header
        homePage.validateNumberOfRows(8);
        var editPage: EditPage = homePage.clickOnEditInRow(2);
        editPage.clickOnDelete();
        homePage.validateNumberOfRows(7);
    });

});