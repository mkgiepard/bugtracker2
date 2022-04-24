import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportAddCommentComponent } from './bug-report-add-comment.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// Http testing module and mocking controller
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MaterialModule } from '../../modules/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('BugReportAddCommentComponent', () => {
  let component: BugReportAddCommentComponent;
  let fixture: ComponentFixture<BugReportAddCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportAddCommentComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        // NoopAnimationsModule,
        // ReactiveFormsModule,
        RouterTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportAddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
