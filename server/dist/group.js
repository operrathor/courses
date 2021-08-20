"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroups = exports.Group = void 0;
const event_1 = require("./event");
class Group {
    constructor(groupId, icalUrl, events) {
        this.groupId = groupId;
        this.icalUrl = icalUrl;
        this.events = events;
    }
}
exports.Group = Group;
const getGroupId = ($, groupHeader) => Number($(groupHeader)
    .children('th')
    .first()
    .find('div')
    .text()
    .replace(/^Gruppe /, ''));
const getIcalUrl = ($, groupHeader) => {
    const relativePath = $(groupHeader)
        .children('th')
        .last()
        .find('a')
        .first()
        .attr('href');
    return `https://lfuonline.uibk.ac.at/public/${relativePath}`;
};
const getGroups = async ($) => Promise.all($('#sdgpanel')
    .next()
    .find('thead tr')
    .map(async (index, groupHeader) => {
    const groupId = getGroupId($, groupHeader);
    const icalUrl = getIcalUrl($, groupHeader);
    const events = await event_1.getEvents(icalUrl);
    return new Group(groupId, icalUrl, events);
})
    .get());
exports.getGroups = getGroups;
