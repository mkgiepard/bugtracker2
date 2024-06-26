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
import { of } from 'rxjs';
import { User } from '../../dataModel/user';
import { UserService } from 'src/app/services/user.service';
import { FullNamePipe } from 'src/app/pipes/full-name-pipe';

class MockUserService {
  testUser: User = {
    username: 'atester',
    email: 'atester@softtest.dev',
    firstName: 'Alpha',
    lastName: 'Tester',
  };

  getUser(username: string) {
    return of(this.testUser);
  }
}

describe('BugReportCreateComponent', () => {
  let component: BugReportCreateComponent;
  let fixture: ComponentFixture<BugReportCreateComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportCreateComponent, FullNamePipe],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: UserService, useClass: MockUserService }],
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
    const button = getButtonElement('Cancel');

    button?.click();

    expect(navSpy).toHaveBeenCalledTimes(1);
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/list');
  });

  it('should show disabled Save button on empty form', () => {
    const saveButton = getButtonElement('Save');

    expect(saveButton?.disabled).toBeTruthy();
  });

  it('should show enabled Save button with all the data filled', () => {
    seedInputElement('Title', 'someTitle');
    seedInputElement('Description', 'some desc');
    fixture.detectChanges();

    const saveButton = getButtonElement('Save');

    expect(saveButton?.disabled).toBeFalsy();
  });

  it('should show disabled Save button on partially filled form', () => {
    seedInputElement('Title', 'someTitle');
    fixture.detectChanges();

    const saveButton = getButtonElement('Save');

    expect(saveButton?.disabled).toBeTruthy();
  });

  it('should show disabled Save button when filled field is cleared', () => {
    seedInputElement('Title', 'someTitle');
    seedInputElement('Description', 'some desc');
    fixture.detectChanges();

    let saveButton = getButtonElement('Save');

    expect(saveButton?.disabled).toBeFalsy();

    seedInputElement('Description', '');
    fixture.detectChanges();
    saveButton = getButtonElement('Save');

    expect(saveButton?.disabled).toBeTruthy();
  });

  it('should call add() method when Save is clicked', () => {
    spyOn(component, 'add');

    seedInputElement('Title', 'someTitle');
    seedInputElement('Description', 'some desc');
    fixture.detectChanges();

    const saveButton = getButtonElement('Save');
    saveButton.click();

    expect(component.add).toHaveBeenCalled();
  });

  function seedInputElement(text: string, value: string) {
    let input = getInputElement(text);
    if (input == null) {
      input = getTextAreaElement(text);
    }
    input.value = value;
    input?.dispatchEvent(new Event('input'));
  }

  function getInputElement(text: string): HTMLInputElement {
    const inputs = fixture.nativeElement.querySelectorAll(
      'input'
    ) as HTMLInputElement[];
    const inputElement = Array.from(inputs).find(
      (el) => el.placeholder === text
    ) as HTMLInputElement;
    return inputElement;
  }

  function getTextAreaElement(text: string): HTMLInputElement {
    const inputs = fixture.nativeElement.querySelectorAll(
      'textarea'
    ) as HTMLInputElement[];
    const inputElement = Array.from(inputs).find(
      (el) => el.placeholder === text
    ) as HTMLInputElement;
    return inputElement;
  }

  function getButtonElement(text: string): HTMLButtonElement {
    const buttons = fixture.nativeElement.querySelectorAll(
      'button'
    ) as HTMLButtonElement[];
    const button = Array.from(buttons).find(
      (el) => el.textContent === text
    ) as HTMLButtonElement;
    return button;
  }
});
