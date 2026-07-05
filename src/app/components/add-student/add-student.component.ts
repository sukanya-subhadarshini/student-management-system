import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  student = {

    name: '',
    email: '',
    password: '',
    mobile: '',
    course: '',
    gender: '',
    address: '',
    dob: ''

  };

  constructor(
    private dialogRef: MatDialogRef<AddStudentComponent>,
    private service: StudentService
  ) {}

  save() {

    this.service.addStudent(this.student).subscribe({

      next: (res) => {

        alert("Student Added Successfully");

        this.dialogRef.close(true);

      },

      error: (err) => {

        console.log(err);

        alert("Failed to Add Student");

      }

    });

  }

}