"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = exports.Event = void 0;
const node_ical_1 = __importDefault(require("node-ical"));
class Event {
    constructor(title, start, end, groupId) {
        this.title = title;
        this.start = start;
        this.end = end;
        this.groupId = groupId;
    }
}
exports.Event = Event;
const getEvents = async (courseId, group) => {
    const rawEvents = await node_ical_1.default.async.fromURL(group.icalUrl);
    return Object.values(rawEvents)
        .map((e) => e) // TODO filter
        .map((e) => new Event(`Group ${group.id}: ${e.summary}`, e.start.toISOString(), e.end.toISOString(), group.id
    /*     extendedProps: {
location: e.location,
comment: e.comment,
courseId,
}, */
    ));
};
exports.getEvents = getEvents;
