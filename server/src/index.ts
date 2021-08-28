import express from 'express';
import apicache from 'apicache';
import cors from 'cors';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import { Response } from './response';
import { Group, getGroups } from './group';

const app = express();
const cache = apicache.middleware;
const port = 3001;

app.use(cors());

const getEcts = ($: cheerio.Root) => {
  const value = $('#content')
    .children()
    .filter(
      (index, element) =>
        $(element).find('.col-sm-3').first().text() === 'ECTS-AP:'
    )
    .map((index, element) => $(element).find('.col-sm-9').first().text())
    .get()[0];
  return parseFloat(value.replace(',', '.'));
};

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

  let groups: Group[] = [];
  try {
    groups = await getGroups($);
  } catch (err) {
    console.error(`Error fetching groups for course ${courseId}`, err);
  }

  res.json(new Response(Number(courseId), title, getEcts($), groups));
});

app.listen(port, () => {
  console.log(`Courses Server listening at http://localhost:${port}`);
});
