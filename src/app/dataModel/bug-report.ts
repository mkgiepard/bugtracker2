export interface BugReport {
  bug_id: number;
  title: string;
  priority: number;
  status: string;
  description: string;
  author: string;
  comment?: string[];
}
