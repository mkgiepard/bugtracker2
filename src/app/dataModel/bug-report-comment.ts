import { User, userData } from './user';

export interface BugReportComment {
  author: User;
  comment: string;
}
