"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio_1 = __importDefault(require("cheerio"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const groups_1 = require("./groups");
const app = express_1.default();
const port = 3001;
const responseCache = new Map();
app.use(cors_1.default());
app.get('/courses/:id', async (req, res) => {
    const courseId = req.params.id;
    if (responseCache.has(courseId)) {
        res.json(responseCache.get(courseId));
        return;
    }
    const coursePageContent = await node_fetch_1.default(`https://lfuonline.uibk.ac.at/public/lfuonline_lv.details?lvnr_id_in=${courseId}`)
        .then((fetchRes) => fetchRes.buffer())
        .then((buffer) => iconv_lite_1.default.decode(buffer, 'ISO-8859-1'));
    const $ = cheerio_1.default.load(coursePageContent);
    const title = $('h3').text();
    const groups = groups_1.getGroups($);
    const convertedGroups = await groups_1.convertGroups(courseId, groups);
    const response = {
        title,
        groups: convertedGroups,
    };
    responseCache.set(req.params.id, response);
    res.json(response);
});
app.listen(port, () => {
    console.log(`Courses Server listening at http://localhost:${port}`);
});
