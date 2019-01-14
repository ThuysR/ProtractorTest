import { Reporter } from "../support/reporter";
import { browser, Config } from 'protractor';
const jsonReports = process.cwd() + "/reports/json";

export const config: Config = {

    baseUrl: "https://theuselessweb.com",
    
    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: ["--no-sandbox", "--disable-gpu"] //add --headless for jenkins or so
        }
    },
    directConnect: true,
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [
        "../../projectFiles/features/test/test.feature" // feature/*.feature for all features in that map
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
            "../../projectFiles/stepDefinitions/*.ts",

            
            "../../projectFiles/support/*.ts",
            "../../projectFiles/support/hooks/dev-hooks.ts"
            ],
        strict: true
    },

    onComplete: async () => {
        Reporter.createHTMLReport();
        browser.close()
    },
};