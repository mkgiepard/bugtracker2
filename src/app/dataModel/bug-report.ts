export interface BugReport {
  bug_id: number;
  title: string;
  priority: number;
  status: string;
  description: string;
  author: string;
  comment?: string[];
}

export const bugReportData: BugReport[] = [
  {
    bug_id: 1001,
    title: 'bug report 1',
    priority: 0,
    status: 'new',
    description: 'lorem epsum...',
    author: 'Buggy Bug',
  },
  {
    bug_id: 1002,
    title: 'bug report 2',
    priority: 1,
    status: 'assigned',
    description: 'lorem epsum...',
    author: 'Buggy Bug',
  },
  {
    bug_id: 1003,
    title: 'bug report 3',
    priority: 2,
    status: 'accepted',
    description: 'lorem epsum...',
    author: 'Buggy Bug',
  },
  {
    bug_id: 1004,
    title: 'bug report 4',
    priority: 0,
    status: 'fixed',
    description: 'lorem epsum...',
    author: 'Buggy Bug',
  },
  {
    bug_id: 1005,
    title: 'bug report 5',
    priority: 1,
    status: 'wai',
    description: 'lorem epsum...',
    author: 'Buggy Bug',
  },
  {
    bug_id: 1006,
    title: 'bug report 6',
    priority: 2,
    status: 'wnf',
    description: 'lorem epsum...',
    author: 'Buggy Bug',
  },
  {
    bug_id: 1007,
    title: 'bug report 7',
    priority: 0,
    status: 'new',
    description: 'lorem epsum...',
    author: 'Buggy Bug',
  },
];
