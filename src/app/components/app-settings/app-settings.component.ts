import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
})
export class AppSettingsComponent {
  constructor(private http: HttpClient) {}

  message: String | undefined;

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/app/settings').subscribe({
      next: (res) => {
        if (res) {
          this.message = res.msg;
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.message =
            'You are not authorized to visit this route. No data is displayed';
        }
        console.log(error);
      },
    });
  }
}
