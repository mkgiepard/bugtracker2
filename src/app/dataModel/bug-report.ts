import { User, userData } from './user';
import { BugReportComment } from './bug-report-comment';
import { BugReportUpdate } from './bug-report-update';

export enum Status {
  New = 'New',
  Assigned = 'Assigned',
  Accepted = 'Accepted',
  Fixed = 'Fixed',
  WAI = 'WAI',
  WNF = 'WNF',
}

export interface BugReport {
  id: number;
  title: string;
  priority: number;
  status: Status;
  description: string;
  author: User;
  comments?: BugReportComment[];
  updates?: BugReportUpdate[];
  created: Date;
  updated: Date;
}

export const bugReportData: BugReport[] = [
  {
    id: 1001,
    title: 'bug report 1',
    priority: 0,
    status: Status.New,
    description: 'lorem epsum...',
    author: userData[0],
    comments: [
      { author: userData[0], comment: 'first comment' },
      { author: userData[1], comment: 'second comment' },
      { author: userData[0], comment: 'third comment' },
    ],
    updates: [
      {
        author: userData[0],
        update: 'Priority change P1 > P0',
      },
    ],
    created: new Date(1924, 1, 12),
    updated: new Date(2024, 3, 21)
  },
  {
    id: 1002,
    title: 'bug report 2',
    priority: 1,
    status: Status.Accepted,
    description: 'lorem epsum...',
    author: userData[1],
    comments: [{ author: userData[0], comment: 'first comment' }],
    created: new Date(1924, 1, 12),
    updated: new Date(2024, 3, 21)
  },
  {
    id: 1003,
    title: 'bug report 3',
    priority: 2,
    status: Status.Assigned,
    description: 'lorem epsum...',
    author: userData[2],
    comments: [
      { author: userData[0], comment: 'first comment' },
      { author: userData[1], comment: 'second comment' },
      { author: userData[2], comment: 'third comment' },
      { author: userData[0], comment: 'lorem epsum' },
    ],
    created: new Date(1924, 1, 12),
    updated: new Date(2024, 3, 21)
  },
  {
    id: 1004,
    title: 'bug report 4',
    priority: 0,
    status: Status.Fixed,
    description: 'lorem epsum...',
    author: userData[3],
    comments: [],
    created: new Date(1924, 1, 12),
    updated: new Date(2024, 3, 21)
  },
  {
    id: 1005,
    title: 'bug report 5',
    priority: 1,
    status: Status.WAI,
    description: 'lorem epsum...',
    author: userData[4],
    comments: [],
    created: new Date(1924, 1, 12),
    updated: new Date(2024, 3, 21)
  },
  {
    id: 1006,
    title: 'bug report 6',
    priority: 2,
    status: Status.WNF,
    description: 'lorem epsum...',
    author: userData[0],
    comments: [],
    created: new Date(1924, 1, 12),
    updated: new Date(2024, 3, 21)
  },
  {
    id: 1007,
    title: 'bug report 7',
    priority: 0,
    status: Status.New,
    description: 'lorem epsum...',
    author: userData[1],
    comments: [],
    created: new Date(1924, 1, 12),
    updated: new Date(2024, 3, 21)
  },
];
