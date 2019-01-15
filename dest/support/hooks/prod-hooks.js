"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { BeforeAll, After, Before, Status, setDefaultTimeout } = require("cucumber");
const baseFile_1 = require("../../config/baseFile");
const baseHooks_1 = require("./baseHooks");
baseHooks_1.executeHooks(baseFile_1.prodBaseFile);
