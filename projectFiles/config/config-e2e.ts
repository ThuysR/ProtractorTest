import { browser, Config } from "protractor";
import { Reporter } from "../support/reporter";
const jsonReports = process.cwd() + "/reports/json";

export const config: Config = {

    baseUrl: "https://dev-myequipmenttracker.tvh.com",
    
    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: ["--no-sandbox", "--disable-gpu"]
        }
    },
    directConnect: true,
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [
        "../../../projectFiles/features/*.feature"
    ],

    onPrepare: () => {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();
        Reporter.createDirectory(jsonReports);
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: "json:./reports/json/cucumber_report.json",
        require: [            
            "../../../projectFiles/stepDefinitions/*.ts",
 
            "../../../projectFiles/support/*.ts",
            "../../../projectFiles/support/hooks/dev-hooks.ts"
            ],
        strict: true
    },

    onComplete: async () => {
        Reporter.createHTMLReport();
        browser.close()
    },
};
