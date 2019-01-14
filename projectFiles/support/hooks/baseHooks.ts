const { BeforeAll, After, AfterAll, Before, Status, setDefaultTimeout } = require("cucumber");
import { browser } from "protractor";
import { factory } from "../ConfigLog4j";
import { WriteScreenShot } from '../writefile'

const LOG = factory.getLogger("Hooks")

export function executeHooks(baseFile) {
    BeforeAll({ timeout: 60 * 2000 }, async () => {
        await browser.get(baseFile.baseUrl);
    });

    Before(async function (scenario) {
        await LOG.info(() => "\n\n--------TEST STARTING: " + JSON.stringify(scenario).split("name\":\"").pop().split("\"", 1) + " || from: " + JSON.stringify(scenario).split("uri\":\"").pop().split("\"", 1) + "--------");
    });

    setDefaultTimeout(60 * 1000);

    After(async function (scenario) {
        if (scenario.result.status === Status.FAILED) {
            await LOG.error("\n\n!!~~~~~~TEST FAILED~~~~~~!!\n\n");
            const screenShot = await browser.takeScreenshot();
            this.attach(screenShot, "image/png");
            WriteScreenShot(screenShot, "SCRN");
        }
        await LOG.info(() => "\n--------TEST DONE--------\n")
    });

    AfterAll(async function () {
        await LOG.info(() => "\n--------ALL DONE--------\n")
    });

}    
