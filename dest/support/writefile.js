"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment = __importStar(require("moment"));
const fs = __importStar(require("fs"));
let { mkdirp } = require('mkdirp'); // npm i -D mkdirp
function WriteScreenShot(data, filename) {
    let datetime = moment().format('YYYYMMDD-hhmmss');
    filename = `./reports/failed-screenshots/${filename}.${datetime}.png`;
    var dir = "./reports/failed-screenshots";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir); // creates multiple folders if they don't exist
    }
    let stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}
exports.WriteScreenShot = WriteScreenShot;
