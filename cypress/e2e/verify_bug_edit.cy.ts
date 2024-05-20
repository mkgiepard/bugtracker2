import { EditPage } from '../pages/edit_page';
import { HomePage } from '../pages/home_page';
import { LoginPage } from '../pages/login_page';

const homePage = new HomePage();

describe("Verify bug edition", () => {
    beforeEach(() => {
        const login = new LoginPage();
        login.open();
        login.loginWithTestUser();

        homePage.open();
    })

    it("Verify opening bug edit page from the home page", () => {
        // Number of issues + table header
        homePage.validateNumberOfRows(8);
        var editPage: EditPage = homePage.clickOnEditInRow(1);
        editPage.validateEditPage();
    });

    it("Verify if 'Back' button on edit page takes user to the home page'", () => {
        var editPage = new EditPage();
        editPage.open(1001);
        var pageAfterBack: HomePage = editPage.clickOnBack();
        pageAfterBack.validateHomePage();
    });

    it("Verify bug title update", () => {
        var editPage = new EditPage();
        editPage.open(1001);
        editPage.updateTitle("this is new title");
        var pageAfterSave: HomePage = editPage.clickOnSave();
        pageAfterSave.clickOnBugTitle("this is new title");
    })
});