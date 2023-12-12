import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BugReportCreateComponent } from './components/bug-report-create/bug-report-create.component';
import { BugReportEditComponent } from './components/bug-report-edit/bug-report-edit.component';
import { BugReportViewComponent } from './components/bug-report-view/bug-report-view.component';
import { BugReportListComponent } from './components/bug-report-list/bug-report-list.component';
import { BugReportAddCommentComponent } from './components/bug-report-add-comment/bug-report-add-comment.component';
import { BugReportSearchComponent } from './components/bug-report-search/bug-report-search.component';
import { BugReportActionsComponent } from './components/bug-report-actions/bug-report-actions.component';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'create', component: BugReportCreateComponent },
  { path: 'edit/:id', component: BugReportEditComponent },
  { path: 'view/:id', component: BugReportViewComponent },
  { path: 'list', component: BugReportListComponent },
  { path: 'comment/:id', component: BugReportAddCommentComponent },
  { path: 'search', component: BugReportSearchComponent },
  { path: 'settings', component: AppSettingsComponent },
  { path: 'actions', component: BugReportActionsComponent }, // just for testing, remove it!!!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
