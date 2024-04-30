import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

import { User } from '../dataModel/user';

import { FullNamePipe } from './full-name-pipe';

describe('FullNamePipe', () => {
  let pipe: FullNamePipe;

  beforeEach(() => {
    pipe = new FullNamePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "FirstName LastName" for a User with firstName, lastName set', () => {
    const testUser: User = {
        username: 'atester',
        email: 'atester@softtest.dev',
        firstName: 'Alpha',
        lastName: 'Tester',
    };
    expect(pipe.transform(testUser)).toEqual("Alpha Tester");
  });

  it('should return "FirstName" for a User with firstName only set', () => {
    const testUser: User = {
        username: 'atester',
        email: 'atester@softtest.dev',
        firstName: 'Alpha',
    };
    expect(pipe.transform(testUser)).toEqual("Alpha");
  });

  it('should return "LastName" for a User with lastName only set', () => {
    const testUser: User = {
        username: 'atester',
        email: 'atester@softtest.dev',
        lastName: 'Tester',
    };
    expect(pipe.transform(testUser)).toEqual("Tester");
  });

  it('should return "username" for a User when firstName, lastName are not set', () => {
    const testUser: User = {
        username: 'atester',
        email: 'atester@softtest.dev',
    };
    expect(pipe.transform(testUser)).toEqual("atester");
  });

});
