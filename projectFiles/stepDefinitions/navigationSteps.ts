const { When } = require('cucumber');

//Import page objects for usage in the test
import { HomePage } from './../pages/HomePage';


//Declare the object in the beginning for re-usage
const homePage = new HomePage();

When('I go to the {string} page', async (home:string) => {
    await homePage.clickPleaseButton();
    await homePage.FunctionWithParameter(home)
});