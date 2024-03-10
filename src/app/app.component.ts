import { Component } from '@angular/core';
import { AuthService, USERNAME } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Bug tracker v2';
  username = '';
  isUserLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.isUserLoggedIn.subscribe((value) => {
      this.isUserLoggedIn = value;
      const storedUsername = localStorage.getItem(USERNAME);
      if (this.isUserLoggedIn && storedUsername != null) {
        this.username = storedUsername;
      } else {
        this.username = '';
      }
    });
  }
}
