import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BugReportListComponent } from './components/bug-report-list/bug-report-list.component';
import { BugReportViewComponent } from './components/bug-report-view/bug-report-view.component';
import { BugReportCreateComponent } from './components/bug-report-create/bug-report-create.component';
import { BugReportEditComponent } from './components/bug-report-edit/bug-report-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BugReportListComponent,
    BugReportViewComponent,
    BugReportCreateComponent,
    BugReportEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
