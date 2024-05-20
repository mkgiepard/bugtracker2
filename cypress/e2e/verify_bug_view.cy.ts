import { ViewPage } from '../pages/view_page';
import { HomePage } from '../pages/home_page';
import { LoginPage } from "../pages/login_page";

const homePage = new HomePage();

describe("Verify bug view page", () => {

    beforeEach(() => {
        const login = new LoginPage();
        login.open();
        login.loginWithTestUser();
    })

    it("Verify opening bug edit page from the home page", () => {
        // homePage.open();
        // Number of issues + table header
        homePage.validateNumberOfRows(8);
        var viewPage: ViewPage = homePage.clickOnBugTitle('bug report 2');
        viewPage.validateViewPage();
    });

    it("Verify if 'Back' button on view page takes user to the home page'", () => {
        var viewPage = new ViewPage();
        viewPage.open(1001);
        var pageAfterBack: HomePage = viewPage.clickOnBack();
        pageAfterBack.validateHomePage();
    });
});