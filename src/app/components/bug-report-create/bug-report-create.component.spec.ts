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
import { Router } from '@angular/router';

describe('BugReportCreateComponent', () => {
  let component: BugReportCreateComponent;
  let fixture: ComponentFixture<BugReportCreateComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportCreateComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /list when "Cancel" button is clicked', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const buttons = fixture.nativeElement.querySelectorAll(
      'button'
    ) as HTMLElement[];
    const button = Array.from(buttons).find(
      (el) => el.textContent === 'Cancel'
    );

    button?.click();

    expect(navSpy).toHaveBeenCalledTimes(1);
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/list');
  });

  it('should show disabled Save button on empty form', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      'button'
    ) as HTMLButtonElement[];
    const saveButton = Array.from(buttons).find(
      (el) => el.textContent === 'Save'
    );

    expect(saveButton?.disabled).toBeTruthy();
  });

  it('should show enabled Save button with all the data filled', () => {
    const inputs = fixture.nativeElement.querySelectorAll(
      'input'
    ) as HTMLInputElement[];
    const titleInput = Array.from(inputs).find(
      (el) => el.placeholder === 'Title'
    ) as HTMLInputElement;
    titleInput.value = 'someTitle';
    titleInput?.dispatchEvent(new Event('input'));
    const authorInput = Array.from(inputs).find(
      (el) => el.placeholder === 'Author'
    ) as HTMLInputElement;
    authorInput.value = 'some author';
    authorInput?.dispatchEvent(new Event('input'));
    const textAreas = fixture.nativeElement.querySelectorAll(
      'textarea'
    ) as HTMLInputElement[];
    const descInput = Array.from(textAreas).find(
      (el) => el.placeholder === 'Description'
    ) as HTMLInputElement;
    descInput.value = 'some desc';
    descInput?.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      'button'
    ) as HTMLButtonElement[];
    const saveButton = Array.from(buttons).find(
      (el) => el.textContent === 'Save'
    );

    expect(saveButton?.disabled).toBeFalsy();
  });

  it('should show disabled Save button on partially filled form', () => {
    const inputs = fixture.nativeElement.querySelectorAll(
      'input'
    ) as HTMLInputElement[];
    const titleInput = Array.from(inputs).find(
      (el) => el.placeholder === 'Title'
    ) as HTMLInputElement;
    titleInput.value = 'someTitle';
    titleInput?.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      'button'
    ) as HTMLButtonElement[];
    const saveButton = Array.from(buttons).find(
      (el) => el.textContent === 'Save'
    );

    expect(saveButton?.disabled).toBeTruthy();
  });

  xit('should show disabled Save button when filled field is cleared', () => {});

  xit('should call add() method wehn Save is clicked', () => {});

  xit('should pass bugReport data to add() method when Save is clicked', () => {});
});
