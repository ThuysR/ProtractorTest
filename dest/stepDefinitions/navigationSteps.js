"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { When } = require('cucumber');
//Import page objects for usage in the test
const HomePage_1 = require("./../pages/HomePage");
//Declare the object in the beginning for re-usage
const homePage = new HomePage_1.HomePage();
When('I go to the {string} page', (home) => __awaiter(this, void 0, void 0, function* () {
    yield homePage.clickPleaseButton();
    yield homePage.FunctionWithParameter(home);
}));
