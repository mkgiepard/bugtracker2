import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportCreateComponent } from './bug-report-create.component';

describe('BugReportCreateComponent', () => {
  let component: BugReportCreateComponent;
  let fixture: ComponentFixture<BugReportCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugReportCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
