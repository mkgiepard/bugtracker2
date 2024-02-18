import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppSettingsComponent } from './app-settings.component';

describe('AppSettingsComponent', () => {
  let component: AppSettingsComponent;
  let fixture: ComponentFixture<AppSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppSettingsComponent],
    });

    fixture = TestBed.createComponent(AppSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
