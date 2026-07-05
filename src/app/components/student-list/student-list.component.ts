import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { StudentService, Student } from '../../services/student.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private service: StudentService
  ) {}

  searchText: string = '';

  students: Student[] = [];
  filteredStudents: Student[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'mobile',
    'course',
    'dob',
    'gender',
    'action'
  ];

  ngOnInit(): void {
    this.loadStudents();
  }

  // ✅ LOAD
  loadStudents(): void {
    this.service.getStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
        this.filteredStudents = data;
      },
      error: (err) => {
        console.log(err);
        alert("Unable to load students");
      }
    });
  }

  // ✅ ADD
  openAddStudentDialog(): void {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents();
      }
    });
  }

  // ✅ SEARCH
  searchStudent(): void {
    if (!this.searchText.trim()) {
      this.filteredStudents = this.students;
    } else {
      this.filteredStudents = this.students.filter(s =>
        s.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  // ✅ DELETE
  deleteStudent(id: number): void {
    if (!confirm("Are you sure?")) return;

    this.service.deleteStudent(id).subscribe({
      next: () => {
        alert("Deleted Successfully");
        this.loadStudents();
      },
      error: (err) => {
        console.log(err);
        alert("Delete Failed");
      }
    });
  }

  // ✅ ROW CLICK (optional)
  selectStudent(student: Student) {
    console.log("Clicked:", student);
  }

  // ✅ PDF DOWNLOAD
  downloadPDF(): void {

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Student Details Report', 14, 15);

    const tableData = this.filteredStudents.map(s => [
      s.id ?? '',
      s.name ?? '',
      s.email ?? '',
      s.mobile ?? '',
      s.course ?? '',
      s.dob ? new Date(s.dob).toLocaleDateString() : '',
      s.gender ?? ''
    ]);

    autoTable(doc, {
      startY: 25,
      head: [['ID', 'Name', 'Email', 'Mobile', 'Course', 'DOB', 'Gender']],
      body: tableData
    });

    doc.save('students.pdf');
  }

}