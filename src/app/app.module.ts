import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { MaterialModule } from './modules/material/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

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
import { BugReportActionsComponent } from './components/bug-report-actions/bug-report-actions.component';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { importProvidersFrom } from '@angular/core';

import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CastPipe } from "./pipes/cast.pipe";
import { UserListComponent } from './components/user-list/user-list.component';

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
        BugReportActionsComponent,
        AppSettingsComponent,
        AccountSettingsComponent,
        LoginComponent,
        RegisterComponent,
        CastPipe,
        UserListComponent
    ],
    exports: [MaterialModule, FormsModule, ReactiveFormsModule],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
              subscriptSizing: 'dynamic'
            }
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
            dataEncapsulation: false,
            passThruUnknownUrl: true,
        }),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
    ]
})
export class AppModule {}
