const { BeforeAll, After, Before, Status, setDefaultTimeout } = require("cucumber");
import { localBaseFile } from "../../config/baseFile";
import { executeHooks } from './baseHooks';

executeHooks(localBaseFile);
