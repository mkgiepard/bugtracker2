import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

describe('AppComponent', () => {
  // TODO: do it properly!
  let mockAuthService = {
    isUserLoggedIn: { subscribe: () => {} },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Bug tracker v2'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Bug tracker v2');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.toolbar span')?.textContent).toContain(
      'Bug tracker v2'
    );
  });
});
