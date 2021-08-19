import { getEvents } from './events';

class Group {
  readonly id: number;

  readonly icalUrl: string;

  constructor(id: number, icalUrl: string) {
    this.id = id;
    this.icalUrl = icalUrl;
  }
}

const getGroups = ($: any) =>
  $('#rubrikenpanel')
    .next()
    .next()
    .find('thead tr')
    .map(
      (index: any, tr: any) =>
        new Group(
          $(tr)
            .children('th')
            .first()
            .find('div')
            .text()
            .replace(/^Gruppe /, ''),
          `https://lfuonline.uibk.ac.at/public/${$(tr)
            .children('th')
            .last()
            .find('a')
            .first()
            .attr('href')}`
        )
    )
    .get();
const convertGroups = async (courseId: number, groups: any) =>
  Promise.all(
    groups.map(async (group: any) => {
      const events = await getEvents(courseId, group);
      return {
        groupId: group.id,
        events,
      };
    })
  );

export { getGroups, convertGroups };
