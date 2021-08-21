import express from 'express';
import apicache from 'apicache';
import cors from 'cors';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import { Response } from './response';
import { getGroups } from './group';

const app = express();
const cache = apicache.middleware;
const port = 3001;

app.use(cors());

app.get('/api/courses/:id', cache('1 hour'), async (req, res) => {
  const courseId = req.params.id;

  console.log(`Fetching course ${courseId}`);

  const coursePageContent = await fetch(
    `https://lfuonline.uibk.ac.at/public/lfuonline_lv.details?lvnr_id_in=${courseId}`
  )
    .then((fetchRes) => fetchRes.buffer())
    .then((buffer) => iconv.decode(buffer, 'ISO-8859-1'));

  const $: cheerio.Root = cheerio.load(coursePageContent);

  const fullTitle = $('h3').text();
  const title = fullTitle.substr(fullTitle.indexOf(' ') + 1);
  if (!title) {
    console.warn(`Invalid course ${courseId}`);
    res.status(400).send(`Invalid course ${courseId}`);
    return;
  }

  const groups = await getGroups($);

  res.json(new Response(Number(courseId), title, groups));
});

app.listen(port, () => {
  console.log(`Courses Server listening at http://localhost:${port}`);
});
