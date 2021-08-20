import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import { Response } from './response';
import { getGroups } from './group';

const app = express();
const port = 3001;

const responseCache = new Map<number, Response>();

app.use(cors());

app.get('/courses/:id', async (req, res) => {
  const courseId = Number(req.params.id);

  if (responseCache.has(courseId)) {
    res.json(responseCache.get(courseId));
    return;
  }

  const coursePageContent = await fetch(
    `https://lfuonline.uibk.ac.at/public/lfuonline_lv.details?lvnr_id_in=${courseId}`
  )
    .then((fetchRes) => fetchRes.buffer())
    .then((buffer) => iconv.decode(buffer, 'ISO-8859-1'));

  const $: cheerio.Root = cheerio.load(coursePageContent);
  const fullTitle = $('h3').text();
  const title = fullTitle.substr(fullTitle.indexOf(' ') + 1);
  const groups = await getGroups($);

  const response = new Response(courseId, title, groups);
  responseCache.set(courseId, response);
  res.json(response);
});

app.listen(port, () => {
  console.log(`Courses Server listening at http://localhost:${port}`);
});
