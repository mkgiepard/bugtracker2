import { CreatePage } from '../pages/create_page';
import { ViewPage } from '../pages/view_page';
import { HomePage } from '../pages/home_page';

const homePage = new HomePage();

describe("Verify bug creattion", () => {

    it("Verify opening bug create page from the home page", () => {
        homePage.open();
        // Number of issues + table header
        homePage.validateNumberOfRows(8);
        var createPage: CreatePage = homePage.clickFAB();
        createPage.validateCreatePage();
    });

    it("Verify if 'Cancel' button on create page takes user to the home page'", () => {
        var createPage = new CreatePage();
        createPage.open();
        var pageAfterBack: HomePage = createPage.clickOnCancel();
        pageAfterBack.validateHomePage();
    });

    it("Verify basic issue creation with default data", () => {
        var createPage: CreatePage = new CreatePage();
        createPage.open();
        createPage.typeTitle('my title');
        createPage.typeAuthor('joe doe');
        createPage.typeDesc('my desc\n2nd line');
        var pageAfterSave: HomePage = createPage.clickOnSave();
        pageAfterSave.validateHomePage();
        pageAfterSave.clickOnBugTitle('my title');
    });
});