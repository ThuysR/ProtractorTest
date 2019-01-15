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
const reporter_1 = require("../support/reporter");
const protractor_1 = require("protractor");
const jsonReports = process.cwd() + "/reports/json";
exports.config = {
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
        protractor_1.browser.ignoreSynchronization = true;
        protractor_1.browser.driver.manage().window().maximize();
        reporter_1.Reporter.createDirectory(jsonReports);
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
    onComplete: () => __awaiter(this, void 0, void 0, function* () {
        reporter_1.Reporter.createHTMLReport();
        protractor_1.browser.close();
    }),
};
