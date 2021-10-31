import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportEditComponent } from './bug-report-edit.component';

describe('BugReportEditComponent', () => {
  let component: BugReportEditComponent;
  let fixture: ComponentFixture<BugReportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugReportEditComponent ]
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
