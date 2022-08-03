import { AddCommentPage } from '../pages/add_comment_page';
import { HomePage } from '../pages/home_page';

const homePage = new HomePage();

describe("Verify add comment page", () => {

    it("Verify opening add comment page from the home page", () => {
        homePage.open();
        // Number of issues + table header
        homePage.validateNumberOfRows(8);
        var addCommentPage: AddCommentPage = homePage.clickOnAddCommentInRow(2);
        addCommentPage.validateAddCommentPage();
    });

    it("Verify if 'Back' button on add comment page takes user to the home page'", () => {
        var addCommentPage = new AddCommentPage();
        addCommentPage.open(1001);
        var pageAfterBack: HomePage = addCommentPage.clickOnBack();
        pageAfterBack.validateHomePage();
    });
});