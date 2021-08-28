import { Event, getEvents } from './event';

class Group {
  readonly groupId: number;

  readonly icalUrl: string;

  readonly events: Event[];

  readonly instructors: string;

  constructor(
    groupId: number,
    icalUrl: string,
    events: Event[],
    instructors: string
  ) {
    this.groupId = groupId;
    this.icalUrl = icalUrl;
    this.events = events;
    this.instructors = instructors;
  }
}

const getDatesSection = ($: cheerio.Root) =>
  $('#content')
    .children()
    .filter((index, element) => {
      const id = $(element).attr('id');
      return !!id && /^t-?\d+$/.test(id);
    })
    .first();

const getGroupId = ($: cheerio.Root, groupHeader: cheerio.Element) =>
  Number(
    $(groupHeader)
      .children('th')
      .first()
      .find('div')
      .text()
      .replace(/^Gruppe /, '')
  );

const getIcalUrl = ($: cheerio.Root, groupHeader: cheerio.Element) => {
  const relativePath = $(groupHeader)
    .children('th')
    .last()
    .find('a')
    .first()
    .attr('href');
  return `https://lfuonline.uibk.ac.at/public/${relativePath}`;
};

const getGroups = async ($: cheerio.Root): Promise<Group[]> =>
  Promise.all(
    getDatesSection($)
      .find('thead tr') // find groups
      .map(async (index, groupHeader) => {
        const groupId = getGroupId($, groupHeader);
        const icalUrl = getIcalUrl($, groupHeader);
        const events = await getEvents(icalUrl);
        const instructors = $(groupHeader)
          .parent()
          .next()
          .find('tr td')
          .first()
          .text();
        return new Group(
          groupId,
          icalUrl,
          events,
          instructors === 'Datum' ? '' : instructors
        );
      })
      .get()
  );

export { Group, getGroups };
