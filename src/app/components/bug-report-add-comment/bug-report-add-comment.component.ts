import { Component, OnInit } from '@angular/core';
import { BugReport, Status, bugReportData } from 'src/app/dataModel/bug-report';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BugReportService } from 'src/app/services/bug-report.service';


@Component({
  selector: 'app-bug-report-add-comment',
  templateUrl: './bug-report-add-comment.component.html',
  styleUrls: ['./bug-report-add-comment.component.css']
})
export class BugReportAddCommentComponent implements OnInit {
  bugReport: BugReport | undefined;
  bugReportForm: FormGroup = new FormGroup({
    title: new FormControl(),
    priority: new FormControl(),
    description: new FormControl(),
  });
  bugReportPriority: string | undefined;
  bugComments: string[] | undefined;
  addCommentForm: FormGroup = new FormGroup({
    newComment: new FormControl(),
  });

  constructor(private router: Router, private route: ActivatedRoute, private bugReportService: BugReportService) { }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = Number(routeParams.get('id'));

    // Get the bugReport through the service
    this.getBugReport(idFromRoute);
    // For setting a value in mat-radio-button you need to pass String
    this.bugReportPriority = this.bugReport?.priority.toString();
  }

  getBugReport(id: number) {
    this.bugReportService.getBugReport(id)
      .subscribe(bugReport => this.bugReport = bugReport);
  }

  addComment(comment: string): void {
    if (this.bugReport) {
      this.bugReport.comment?.push(comment);
      this.bugReportService.updateBugReport(this.bugReport)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.router.navigate(["/list"]);
  }

  reload(): void {
    if (this.bugReport == undefined) return;
    this.getBugReport(this.bugReport.id);
  }
}