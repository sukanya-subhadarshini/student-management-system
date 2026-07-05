import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {

  id?: number;
  name: string;
  email: string;
  password?: string;
  mobile: string;
  course: string;
  gender: string;
  address?: string;
  dob?: string;

}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:9099';

  constructor(private http: HttpClient) {}

  // Register Student
  register(student: Student): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, student);
  }

  // Get All Students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  // Add Student
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/students`, student);
  }

  // Delete Student
deleteStudent(id: number): Observable<any> {
  return this.http.delete(
    `${this.apiUrl}/students/${id}`,
    { responseType: 'text' as 'json' }
  );
}

}