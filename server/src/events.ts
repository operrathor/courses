import ical, { VEvent } from 'node-ical';

class Event {
  readonly title: string;

  readonly start: string;

  readonly end: string;

  readonly groupId: number;

  constructor(title: string, start: string, end: string, groupId: number) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.groupId = groupId;
  }
}

const getEvents = async (courseId: number, group: any) => {
  const rawEvents = await ical.async.fromURL(group.icalUrl);
  return Object.values(rawEvents)
    .map((e) => <VEvent>e) // TODO filter
    .map(
      (e) =>
        new Event(
          `Group ${group.id}: ${e.summary}`,
          e.start.toISOString(),
          e.end.toISOString(),
          group.id
          /*     extendedProps: {
      location: e.location,
      comment: e.comment,
      courseId,
    }, */
        )
    );
};

export { Event, getEvents };
