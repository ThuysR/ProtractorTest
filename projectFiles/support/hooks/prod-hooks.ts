const { BeforeAll, After, Before, Status, setDefaultTimeout } = require("cucumber");
import { prodBaseFile } from "../../config/baseFile";
import { executeHooks } from './baseHooks';

executeHooks(prodBaseFile);
