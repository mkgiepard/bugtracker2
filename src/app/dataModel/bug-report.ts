export enum Status {
  New = "New",
  Assigned = "Assigned",
  Accepted = "Accepted",
  Fixed = "Fixed",
  WAI = "WAI",
  WNF = "WNF"
}

export interface BugReport {
  id: number;
  title: string;
  priority: number;
  status: Status;
  description: string;
  author: string;
  comment?: string[];
}

export var bugReportData: BugReport[] = [
  {
    id: 1001,
    title: 'bug report 1',
    priority: 0,
    status: Status.New,
    description: 'lorem epsum...',
    author: 'Buggy Bug',
    comment: ["first comment", "second comment", "third comment"],
  },
  {
    id: 1002,
    title: 'bug report 2',
    priority: 1,
    status: Status.Accepted,
    description: 'lorem epsum...',
    author: 'Buggy Bug',
    comment: ["first comment"],
  },
  {
    id: 1003,
    title: 'bug report 3',
    priority: 2,
    status: Status.Assigned,
    description: 'lorem epsum...',
    author: 'Buggy Bug',
    comment: ["first comment", "second comment", "third comment", "lorem epsum"],
  },
  {
    id: 1004,
    title: 'bug report 4',
    priority: 0,
    status: Status.Fixed,
    description: 'lorem epsum...',
    author: 'Buggy Bug',
  },
  {
    id: 1005,
    title: 'bug report 5',
    priority: 1,
    status: Status.WAI,
    description: 'lorem epsum...',
    author: 'Buggy Bug',
  },
  {
    id: 1006,
    title: 'bug report 6',
    priority: 2,
    status: Status.WNF,
    description: 'lorem epsum...',
    author: 'Buggy Bug',
  },
  {
    id: 1007,
    title: 'bug report 7',
    priority: 0,
    status: Status.New,
    description: 'lorem epsum...',
    author: 'Buggy Bug',
  },
];
