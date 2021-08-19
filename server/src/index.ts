import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import { getGroups, convertGroups } from './groups';

const app = express();
const port = 3001;

const responseCache = new Map();

app.use(cors());

app.get('/courses/:id', async (req, res) => {
  const courseId = req.params.id;
  if (responseCache.has(courseId)) {
    res.json(responseCache.get(courseId));
    return;
  }

  const coursePageContent = await fetch(
    `https://lfuonline.uibk.ac.at/public/lfuonline_lv.details?lvnr_id_in=${courseId}`
  )
    .then((fetchRes) => fetchRes.buffer())
    .then((buffer) => iconv.decode(buffer, 'ISO-8859-1'));

  const $ = cheerio.load(coursePageContent);

  const title = $('h3').text();
  const groups = getGroups($);

  const convertedGroups = await convertGroups(courseId, groups);

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
