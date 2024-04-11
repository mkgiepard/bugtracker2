import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent {
  settingsForm: FormGroup | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    this.userService.getUsers().subscribe((users) => console.log(users));
  }
}
