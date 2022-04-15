import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportAddCommentComponent } from './bug-report-add-comment.component';

describe('BugReportAddCommentComponent', () => {
  let component: BugReportAddCommentComponent;
  let fixture: ComponentFixture<BugReportAddCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugReportAddCommentComponent ]
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
