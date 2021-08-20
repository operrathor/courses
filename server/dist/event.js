"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = exports.Event = void 0;
const node_ical_1 = __importDefault(require("node-ical"));
class Event {
    // TODO comment
    constructor(summary, start, end, location) {
        this.summary = summary;
        this.start = start;
        this.end = end;
        this.location = location;
    }
}
exports.Event = Event;
const getEvents = async (icalUrl) => {
    const calendarResponse = await node_ical_1.default.async.fromURL(icalUrl);
    return Object.values(calendarResponse)
        .map((e) => e)
        .map((e) => new Event(e.summary, e.start.toISOString(), e.end.toISOString(), e.location));
};
exports.getEvents = getEvents;
