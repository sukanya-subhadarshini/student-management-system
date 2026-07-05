import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  today = '';

  students: Student[] = [];

  totalStudents = 0;
  totalCourses = 0;
  maleStudents = 0;
  femaleStudents = 0;

  chart: any;

  // ✅ FIXED COURSE LIST (7 courses)
  courses: string[] = [
    'Frontend Development',
    'Backend Development',
    'Spring Boot',
    'Full Stack Development',
    'Database (MySQL)',
    'DevOps Basics',
    'UI/UX Design'
  ];

  constructor(private service: StudentService) {}

  ngOnInit(): void {
    this.today = new Date().toDateString();
    this.loadDashboard();
  }

  loadDashboard() {

    this.service.getStudents().subscribe({

      next: (data: Student[]) => {

        this.students = data || [];

        // ✅ total students from DB
        this.totalStudents = this.students.length;

        // ✅ male count
        this.maleStudents = this.students.filter(
          s => s.gender?.toLowerCase() === 'male'
        ).length;

        // ✅ female count
        this.femaleStudents = this.students.filter(
          s => s.gender?.toLowerCase() === 'female'
        ).length;

        // ✅ FIXED: total courses = dropdown courses (7)
        this.totalCourses = this.courses.length;

        this.loadChart();
      },

      error: (err) => {
        console.log(err);
      }

    });
  }

  ngAfterViewInit(): void {}

  loadChart() {

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('genderChart', {

      type: 'doughnut',

      data: {

        labels: ['Male', 'Female'],

        datasets: [{
          data: [
            this.maleStudents,
            this.femaleStudents
          ],
          backgroundColor: [
            '#3B82F6',
            '#EC4899'
          ]
        }]

      },

      options: {

        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            position: 'bottom'
          }
        }

      }

    });

  }
}