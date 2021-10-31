import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BugReportCreateComponent } from './components/bug-report-create/bug-report-create.component';
import { BugReportEditComponent } from './components/bug-report-edit/bug-report-edit.component';
import { BugReportViewComponent } from './components/bug-report-view/bug-report-view.component';
import { BugReportListComponent } from './components/bug-report-list/bug-report-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'create', component: BugReportCreateComponent },
  { path: 'edit/:id', component: BugReportEditComponent },
  { path: 'view/:id', component: BugReportViewComponent },
  { path: 'list', component: BugReportListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
