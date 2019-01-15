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
const { BeforeAll, After, AfterAll, Before, Status, setDefaultTimeout } = require("cucumber");
const protractor_1 = require("protractor");
const ConfigLog4j_1 = require("../ConfigLog4j");
const writefile_1 = require("../writefile");
const LOG = ConfigLog4j_1.factory.getLogger("Hooks");
function executeHooks(baseFile) {
    BeforeAll({ timeout: 60 * 2000 }, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get(baseFile.baseUrl);
    }));
    Before(function (scenario) {
        return __awaiter(this, void 0, void 0, function* () {
            yield LOG.info(() => "\n\n--------TEST STARTING: " + JSON.stringify(scenario).split("name\":\"").pop().split("\"", 1) + " || from: " + JSON.stringify(scenario).split("uri\":\"").pop().split("\"", 1) + "--------");
        });
    });
    setDefaultTimeout(60 * 1000);
    After(function (scenario) {
        return __awaiter(this, void 0, void 0, function* () {
            if (scenario.result.status === Status.FAILED) {
                yield LOG.error("\n\n!!~~~~~~TEST FAILED~~~~~~!!\n\n");
                const screenShot = yield protractor_1.browser.takeScreenshot();
                this.attach(screenShot, "image/png");
                writefile_1.WriteScreenShot(screenShot, "SCRN");
            }
            yield LOG.info(() => "\n--------TEST DONE--------\n");
        });
    });
    AfterAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield LOG.info(() => "\n--------ALL DONE--------\n");
        });
    });
}
exports.executeHooks = executeHooks;
