import { HomePage } from '../pages/home_page';

const homePage = new HomePage();

describe("Verify bug deletion", () => {

    it("Delete bug from home page (/list)", () => {
        homePage.open();
        // Number of issues + table header
        homePage.validateNumberOfRows(8);
        homePage.clickOnDeleteInRow(1);
        homePage.validateNumberOfRows(7);
    });

});