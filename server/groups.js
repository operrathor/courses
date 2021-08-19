const { getEvents } = require('./events');

const getGroups = ($) => {
  return $('#rubrikenpanel')
    .next()
    .next()
    .find('thead tr')
    .map((index, tr) => {
      return {
        id: $(tr)
          .children('th')
          .first()
          .find('div')
          .text()
          .replace(/^Gruppe /, ''),
        icalUrl: `https://lfuonline.uibk.ac.at/public/${$(tr)
          .children('th')
          .last()
          .find('a')
          .first()
          .attr('href')}`,
      };
    })
    .get();
};

const convertGroups = async (courseId, groups) => {
  return Promise.all(
    groups.map(async (group) => {
      const events = await getEvents(courseId, group);
      return {
        groupId: group.id,
        events,
      };
    })
  );
};

module.exports = { getGroups, convertGroups };
