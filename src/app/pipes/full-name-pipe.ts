import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../dataModel/user';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(person: User): string {
    return person.firstName + ' ' + person.lastName;
  }
}
