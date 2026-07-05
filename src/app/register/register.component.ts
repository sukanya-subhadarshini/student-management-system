import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  student = {
    name: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    course: '',
    gender: '',
    dob: ''
  };

  courses: string[] = [
  'Frontend Development',
  'Backend Development',
  'Spring Boot',
  'Full Stack Development',
  'Database (MySQL)',
  'DevOps Basics',
  'UI/UX Design'
];

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:9099/register', this.student, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          alert('Registration Successful');
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          alert('Error in registration');
        }
      });
  }
}