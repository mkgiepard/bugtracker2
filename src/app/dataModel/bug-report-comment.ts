import { User } from './user';

export interface BugReportComment {
  author: User;
  comment: string;
  created: Date;
  updated?: Date;
}
