const { BeforeAll, After, Before, Status, setDefaultTimeout } = require("cucumber");
import { devBaseFile } from "../../config/baseFile";
import { executeHooks } from './baseHooks';

executeHooks(devBaseFile);




