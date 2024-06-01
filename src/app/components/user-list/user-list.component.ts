import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { User } from 'src/app/dataModel/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  columns: string[] = [
    'username',
    'email',
    'firstName',
    'lastName',
    'action'
  ]

  data: MatTableDataSource<User> | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {this.data = new MatTableDataSource(users)});
  }

}
