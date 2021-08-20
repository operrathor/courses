import ical, { VEvent } from 'node-ical';

class Event {
  readonly summary: string;

  readonly start: string;

  readonly end: string;

  readonly location: string;

  constructor(summary: string, start: string, end: string, location: string) {
    this.summary = summary;
    this.start = start;
    this.end = end;
    this.location = location;
  }
}

const getEvents = async (icalUrl: string) => {
  const calendarResponse = await ical.async.fromURL(icalUrl);
  return Object.values(calendarResponse)
    .map((e) => <VEvent>e)
    .map(
      (e) =>
        new Event(
          e.summary,
          e.start.toISOString(),
          e.end.toISOString(),
          e.location
        )
    );
};

export { Event, getEvents };
