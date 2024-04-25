import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../dataModel/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { USERNAME } from '../../services/auth.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent {
  settingsForm: FormGroup | undefined;
  user: User | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null),
    });
    this.getUser(localStorage.getItem(USERNAME)!);
  }

  getUser(username: string) {
    this.userService.getUser(username).subscribe((user) => {
      this.user = user;
      this.settingsForm!.patchValue({
        username: this.user!.username,
        email: this.user!.email,
        firstName: this.user!.firstName,
        lastName: this.user!.lastName,
      });
    });
  }

  save(): void {
    this.user = Object.assign(this.user!, this.settingsForm?.value);
    if (this.user) {
      this.userService
        .updateUser(this.user)
        .subscribe(() => this.goBack());
      
    }
  }

  deleteUser(): void {
    this.user = Object.assign(this.user!, this.settingsForm?.value);
    if (this.user) {
      this.userService
        .deleteUser(this.user)
        .subscribe(() => { this.authService.logout(); this.router.navigate(['/login'])});
    }
  }
  
  goBack(): void {
    this.router.navigate(['/list']);
  }
}
