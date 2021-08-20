import { Group } from './group';

class Response {
  readonly courseId: number;

  readonly title: string;

  readonly groups: Group[];

  constructor(courseId: number, title: string, groups: Group[]) {
    this.courseId = courseId;
    this.title = title;
    this.groups = groups;
  }
}

export { Response };
