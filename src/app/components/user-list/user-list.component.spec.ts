import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from 'src/app/services/user.service';
import { createSpyFromClass } from 'jasmine-auto-spies';

import { User } from 'src/app/dataModel/user';

import { Observable, of } from 'rxjs';

class MockUserService {
  getUsers(): Observable<User[]> {
    return of();
  }
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [{provide: UserService, useClass: MockUserService}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
