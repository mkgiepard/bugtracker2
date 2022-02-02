import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportEditComponent } from './bug-report-edit.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('BugReportEditComponent', () => {
  let component: BugReportEditComponent;
  let fixture: ComponentFixture<BugReportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
