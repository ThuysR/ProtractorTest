import * as path from 'path';
import * as moment from 'moment';
import * as fs from 'fs';

let { mkdirp } = require('mkdirp'); // npm i -D mkdirp

export function WriteScreenShot(data: string, filename: string) {
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

