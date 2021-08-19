const ical = require('node-ical');

const getEvents = async (courseId, group) => {
  const rawEvents = await ical.async.fromURL(group.icalUrl);
  return Object.values(rawEvents).map((e) => {
    return {
      title: `Group ${group.id}: ${e.summary}`,
      start: e.start.toISOString(),
      end: e.end.toISOString(),
      groupId: group.id,
      extendedProps: {
        location: e.location,
        comment: e.comment,
        courseId,
      },
    };
  });
};

module.exports = { getEvents };
