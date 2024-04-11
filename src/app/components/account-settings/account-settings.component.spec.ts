import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../../modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AccountSettingsComponent } from './account-settings.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountSettingsComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
