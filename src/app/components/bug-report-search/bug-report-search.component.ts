import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BugReport } from 'src/app/dataModel/bug-report';
import { BugReportService } from 'src/app/services/bug-report.service';

@Component({
  selector: 'app-bug-report-search',
  templateUrl: './bug-report-search.component.html',
  styleUrls: ['./bug-report-search.component.css'],
})
export class BugReportSearchComponent implements OnInit {
  bugReports$!: Observable<BugReport[]>;
  private searchTerms = new Subject<string>();

  constructor(private bugReportService: BugReportService) {}

  ngOnInit(): void {
    this.bugReports$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.bugReportService.searchBugReports(term))
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  // Push a search term into the observable stream.
  clearResults(): void {
    this.searchTerms.next('');
  }
}
