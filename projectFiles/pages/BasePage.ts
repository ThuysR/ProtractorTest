import { browser, by, ElementFinder, protractor, element } from 'protractor';
import { factory } from '../support/ConfigLog4j';

let EC = protractor.ExpectedConditions;

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

let LOG = factory.getLogger("BasePage")
const timeout = 10000;

//This file can be messy, I re-used from my current project, but that project had/has a lot of flaws. thats why I use some Sleeps

export abstract class BasePage {
    pageElement: ElementFinder;

    constructor(pageElement: ElementFinder) {
        this.pageElement = pageElement;
    }

    baseWaitForVisibilityOfPage(timeout = 10000) {
        return this.waitForAngular()
            .then(() => browser.wait(EC.visibilityOf(this.pageElement), timeout));
    }

    waitForElementClick(element: ElementFinder) {
        return this.waitForAngular()
            .then(() => this.sleep(150))
            .then(() => browser.wait(EC.visibilityOf(element), timeout))
            .then(() => element.click());
    }

    waitForElementAndContainsText(element: ElementFinder, text: any) {
        return browser.wait(EC.visibilityOf(element), timeout)
            .then(() => expect(element.getText()).to.eventually.equal(text));
    }s

    baseDropDownSelect(element: ElementFinder, index: number) {
        return element.click()
            .then(() => {
                const options = element.all(by.tagName('option'));
                this.waitForAngular();
                this.sleep(200);
                options.get(index).click();
            });
    }

    baseDropDownSelectByText(element: ElementFinder, value: string) {
        this.waitForAngular();
        return this.sleep(2000)
            .then(() => element.click())
            .then(() => {
                this.waitForAngular();
                this.sleep(2000)
                this.pageElement.element(by.xpath(`//option[text()='${value}']`)).click();
            });
    }

    baseClearStorage() {
        return (browser.sleep(500))
            .then(() => {
                browser.executeScript('window.sessionStorage.clear();')
                browser.executeScript('window.localStorage.clear();')
                browser.sleep(500)
                browser.refresh()
                LOG.info("browser refreshed")
            });
    }


    //RETURN

    waitForVisibilityOfAndReturnText(element: ElementFinder, timeout = 10000) {
        return browser.wait(EC.visibilityOf(element), timeout)
            .then(() => element.getText())
            .then((text) => text);
    }

    basePrintCurrentUrl() {
        return browser.getCurrentUrl()
            .then((text) => {
                console.log('text in', text);
            });
    }

    //ASSERT------------------------------------------------------

    basePageIsVisible(pageElement: string) {
        return browser.wait(EC.presenceOf(element(by.tagName(pageElement))));
    }

    //WAITS-------------------------------------------------------

    waitForAngular() {
        return browser.waitForAngular();
    }

    sleep(wait: any) {
        return browser.sleep(wait);
    }

    baseThrowError(errorMessage:string) {
        throw (errorMessage);
    }

    logMessage(message: string, page: string) {
        LOG = factory.getLogger(page);
        LOG.info(message);
    }
} 
