import { Group } from './group';

class Response {
  readonly courseId: number;

  readonly title: string;

  readonly ects: number;

  readonly groups: Group[];

  constructor(courseId: number, title: string, ects: number, groups: Group[]) {
    this.courseId = courseId;
    this.title = title;
    this.ects = ects;
    this.groups = groups;
  }
}

export { Response };
