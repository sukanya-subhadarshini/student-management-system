import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  login() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:9099/login', data, {
      responseType: 'text'
    }).subscribe({

      next: (res) => {

        if(res === "Login Successful"){
          alert("Login Successful");
          this.router.navigate(['/dashboard']);
        }
        else{
          alert(res);
        }

      },

      error: () => {
        alert("Server Error");
      }

    });

  }

}