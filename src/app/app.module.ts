import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BugReportListComponent } from './components/bug-report-list/bug-report-list.component';
import { BugReportViewComponent } from './components/bug-report-view/bug-report-view.component';
import { BugReportCreateComponent } from './components/bug-report-create/bug-report-create.component';
import { BugReportEditComponent } from './components/bug-report-edit/bug-report-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BugReportSearchComponent } from './components/bug-report-search/bug-report-search.component';
import { BugReportAddCommentComponent } from './components/bug-report-add-comment/bug-report-add-comment.component';

import { FullNamePipe } from './pipes/full-name-pipe';

@NgModule({
  declarations: [
    AppComponent,
    BugReportListComponent,
    BugReportViewComponent,
    BugReportCreateComponent,
    BugReportEditComponent,
    BugReportSearchComponent,
    BugReportAddCommentComponent,
    FullNamePipe,
  ],
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
