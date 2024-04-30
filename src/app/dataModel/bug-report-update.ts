import { User } from './user';

export interface BugReportUpdate {
  author: User;
  update: string;
  created: Date;
}
