import { Event, getEvents } from './event';

class Group {
  readonly groupId: number;

  readonly icalUrl: string;

  readonly events: Event[];

  constructor(groupId: number, icalUrl: string, events: Event[]) {
    this.groupId = groupId;
    this.icalUrl = icalUrl;
    this.events = events;
  }
}

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
    $('#sdgpanel')
      .next()
      .find('thead tr')
      .map(async (index, groupHeader) => {
        const groupId = getGroupId($, groupHeader);
        const icalUrl = getIcalUrl($, groupHeader);
        const events = await getEvents(icalUrl);
        return new Group(groupId, icalUrl, events);
      })
      .get()
  );

export { Group, getGroups };
