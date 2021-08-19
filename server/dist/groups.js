"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertGroups = exports.getGroups = void 0;
const events_1 = require("./events");
class Group {
    constructor(id, icalUrl) {
        this.id = id;
        this.icalUrl = icalUrl;
    }
}
const getGroups = ($) => $('#rubrikenpanel')
    .next()
    .next()
    .find('thead tr')
    .map((index, tr) => new Group($(tr)
    .children('th')
    .first()
    .find('div')
    .text()
    .replace(/^Gruppe /, ''), `https://lfuonline.uibk.ac.at/public/${$(tr)
    .children('th')
    .last()
    .find('a')
    .first()
    .attr('href')}`))
    .get();
exports.getGroups = getGroups;
const convertGroups = async (courseId, groups) => Promise.all(groups.map(async (group) => {
    const events = await events_1.getEvents(courseId, group);
    return {
        groupId: group.id,
        events,
    };
}));
exports.convertGroups = convertGroups;
