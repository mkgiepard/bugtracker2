import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../dataModel/user';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(person: User): string {
    let displayName = person.username;
    if (person.firstName && !person.lastName) {
      displayName = person.firstName;
    }
    if (!person.firstName && person.lastName) {
      displayName = person.lastName;
    }
    if (person.firstName && person.lastName) {
      displayName = person.firstName + ' ' + person.lastName
    }

    return displayName;
  }
}
