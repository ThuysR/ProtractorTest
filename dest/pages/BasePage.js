"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const ConfigLog4j_1 = require("../support/ConfigLog4j");
let EC = protractor_1.protractor.ExpectedConditions;
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;
let LOG = ConfigLog4j_1.factory.getLogger("BasePage");
const timeout = 10000;
//This file can be messy, I re-used from my current project, but that project had/has a lot of flaws. thats why I use some Sleeps
class BasePage {
    constructor(pageElement) {
        this.pageElement = pageElement;
    }
    baseWaitForVisibilityOfPage(timeout = 10000) {
        return this.waitForAngular()
            .then(() => protractor_1.browser.wait(EC.visibilityOf(this.pageElement), timeout));
    }
    waitForElementClick(element) {
        return this.waitForAngular()
            .then(() => this.sleep(150))
            .then(() => protractor_1.browser.wait(EC.visibilityOf(element), timeout))
            .then(() => element.click());
    }
    waitForElementAndContainsText(element, text) {
        return protractor_1.browser.wait(EC.visibilityOf(element), timeout)
            .then(() => expect(element.getText()).to.eventually.equal(text));
    }
    baseDropDownSelect(element, index) {
        return element.click()
            .then(() => {
            const options = element.all(protractor_1.by.tagName('option'));
            this.waitForAngular();
            this.sleep(200);
            options.get(index).click();
        });
    }
    baseDropDownSelectByText(element, value) {
        this.waitForAngular();
        return this.sleep(2000)
            .then(() => element.click())
            .then(() => {
            this.waitForAngular();
            this.sleep(2000);
            this.pageElement.element(protractor_1.by.xpath(`//option[text()='${value}']`)).click();
        });
    }
    baseClearStorage() {
        return (protractor_1.browser.sleep(500))
            .then(() => {
            protractor_1.browser.executeScript('window.sessionStorage.clear();');
            protractor_1.browser.executeScript('window.localStorage.clear();');
            protractor_1.browser.sleep(500);
            protractor_1.browser.refresh();
            LOG.info("browser refreshed");
        });
    }
    //RETURN
    waitForVisibilityOfAndReturnText(element, timeout = 10000) {
        return protractor_1.browser.wait(EC.visibilityOf(element), timeout)
            .then(() => element.getText())
            .then((text) => text);
    }
    basePrintCurrentUrl() {
        return protractor_1.browser.getCurrentUrl()
            .then((text) => {
            console.log('text in', text);
        });
    }
    //ASSERT------------------------------------------------------
    basePageIsVisible(pageElement) {
        return protractor_1.browser.wait(EC.presenceOf(protractor_1.element(protractor_1.by.tagName(pageElement))));
    }
    //WAITS-------------------------------------------------------
    waitForAngular() {
        return protractor_1.browser.waitForAngular();
    }
    sleep(wait) {
        return protractor_1.browser.sleep(wait);
    }
    baseThrowError(errorMessage) {
        throw (errorMessage);
    }
    logMessage(message, page) {
        LOG = ConfigLog4j_1.factory.getLogger(page);
        LOG.info(message);
    }
}
exports.BasePage = BasePage;
