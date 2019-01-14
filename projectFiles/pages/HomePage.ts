import { BasePage } from "./BasePage";
import { ElementFinder, element, by } from 'protractor';


export class HomePage extends BasePage {
   
    pleaseButton: ElementFinder;

    constructor() {
        super(element(by.tagName('hgroup')));
        this.pleaseButton = this.pageElement.$('#button');
    }

    clickPleaseButton() {
        this.logger('Attempting to click the pleaseButton');
        return this.waitForElementClick(this.pleaseButton);
    }

    FunctionWithParameter(home: any): any {
        this.logger(`Just to print the ${home} parameter, watch the back-ticks tho -> parameters can be used without using a + `)
    }

    //Extends from BasePage
    logger(message: string) {
        //Exclude the Logger.factory every file.
        return this.logMessage(message, this.constructor.name);
    }
}