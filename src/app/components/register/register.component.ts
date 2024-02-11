import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

class CustomValidators {
  static passwordsMatch(control: AbstractControl): ValidationErrors {
    const password = control.get('password')!.value;
    const confirmPassword = control.get('confirmPassword')!.value;

    if (
      password === confirmPassword &&
      password != null &&
      confirmPassword != null
    ) {
      return {};
    } else {
      return {
        passwordsNotMatching: true,
      };
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        username: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      {
        validators: CustomValidators.passwordsMatch,
      }
    );
  }

  onSubmit() {
    console.log('onSubmit()');
    if (this.registerForm) {
      if (this.registerForm.invalid) {
        return;
      }
      this.authService
        .register(this.registerForm.value)
        .pipe(map((user) => this.router.navigate(['login'])))
        .subscribe();
    }
  }
}
