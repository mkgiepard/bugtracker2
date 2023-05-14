import { BugReport, Status } from './bug-report';
import { userData } from './user';

describe('BugReport', () => {
  it('first test', () => {
    let b: BugReport = {
      id: 0,
      title: 'title',
      priority: 0,
      status: Status.New,
      description: 'description',
      author: userData[0],
      comments: ['comment'],
    };
  });
});
