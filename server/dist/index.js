"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apicache_1 = __importDefault(require("apicache"));
const cors_1 = __importDefault(require("cors"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio_1 = __importDefault(require("cheerio"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const response_1 = require("./response");
const group_1 = require("./group");
const app = express_1.default();
const cache = apicache_1.default.middleware;
const port = 3001;
app.use(cors_1.default());
app.get('/courses/:id', cache('1 hour'), async (req, res) => {
    const courseId = req.params.id;
    console.log(`Fetching course ${courseId}`);
    const coursePageContent = await node_fetch_1.default(`https://lfuonline.uibk.ac.at/public/lfuonline_lv.details?lvnr_id_in=${courseId}`)
        .then((fetchRes) => fetchRes.buffer())
        .then((buffer) => iconv_lite_1.default.decode(buffer, 'ISO-8859-1'));
    const $ = cheerio_1.default.load(coursePageContent);
    const fullTitle = $('h3').text();
    const title = fullTitle.substr(fullTitle.indexOf(' ') + 1);
    if (!title) {
        console.warn(`Invalid course ${courseId}`);
        res.status(400).send(`Invalid course ${courseId}`);
        return;
    }
    const groups = await group_1.getGroups($);
    res.json(new response_1.Response(Number(courseId), title, groups));
});
app.listen(port, () => {
    console.log(`Courses Server listening at http://localhost:${port}`);
});
