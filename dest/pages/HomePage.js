"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasePage_1 = require("./BasePage");
const protractor_1 = require("protractor");
class HomePage extends BasePage_1.BasePage {
    constructor() {
        super(protractor_1.element(protractor_1.by.tagName('hgroup')));
        this.pleaseButton = this.pageElement.$('#button');
    }
    clickPleaseButton() {
        this.logger('Attempting to click the pleaseButton');
        return this.waitForElementClick(this.pleaseButton);
    }
    FunctionWithParameter(home) {
        this.logger(`Just to print the ${home} parameter, watch the back-ticks tho -> parameters can be used without using a + `);
    }
    //Extends from BasePage
    logger(message) {
        //Exclude the Logger.factory every file.
        return this.logMessage(message, this.constructor.name);
    }
}
exports.HomePage = HomePage;
