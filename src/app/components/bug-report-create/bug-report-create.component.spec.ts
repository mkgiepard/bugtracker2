import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportCreateComponent } from './bug-report-create.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// Http testing module and mocking controller
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../modules/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';

describe('BugReportCreateComponent', () => {
  let component: BugReportCreateComponent;
  let fixture: ComponentFixture<BugReportCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportCreateComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should navigate to main page with click on Cancel', () => {});

  xit('should show disabled Save button on empty form', () => {});

  xit('should show enabled Save button with all the data filled', () => {});

  xit('should show disabled Save button on partially filled form', () => {});

  xit('should show disabled Save button when filled field is cleared', () => {});

  xit('should call add method on Save', () => {});

  xit('should pass bugReport data to add method on Save', () => {});
});
