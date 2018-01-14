import { print } from 'util';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { studentInfo } from '../../Interfaces/studentInfo';
import { toasts } from '../../Interfaces/toasts';
import { Subscription } from 'rxjs/Subscription';
import { forEach } from '@angular/router/src/utils/collection';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {


  @ViewChild('studentLastName') formStudentLastName;
  @ViewChild('studentFirstName') formStudentFirstName;
  @ViewChild('studentParentEmail') formStudentParentEmail;

  @ViewChild('description') description;
  private studentMarkedForDeletion: studentInfo;
  private studentMarkedForInfo: studentInfo;
  private studentInfo: studentInfo = {
    firstName: "",
    lastName: "",
    teacher: "",
    studentId: "",
    parentEmail: "",
    incompleted: 0,
    notApplicable: 0,
    completed: 0,
    edit: false,
    status: ""
  }
  private assignments: any[];
  private toasts: toasts[] = [];

  private homeworkValidated: boolean = true;
  private addStudentFormValidated:boolean = true;

  dashboardState: string = "default";
  addStudentState: boolean = false;
  trackingState: boolean = false;
  createAssignmentState: boolean = false;
  isLoggedIn: boolean; //Holds the boolean for if the user is logged in
  students: studentInfo[];
  track: Subscription;
  descriptionText: string = ""; //Description text for the homework input field
  sub: Subscription;
  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit() {
    this.getStudents();

  }

  //Retrives the student list by sending the teacher ID as a parameter when searching the database.
  getStudents() {
    this.firebaseService.afAuth.authState.subscribe((val) => {
      if (val != null) {
        this.firebaseService.getStudents(val.uid).valueChanges().subscribe(val => {
          this.students = val;
        });

      }
    })
  }

  recordStudents() {
    this.validateHomework();
    if (this.homeworkValidated) {
      for (var i = 0; i <= this.students.length - 1; i++) {
        console.log(this.descriptionText)
        switch (this.students[i].status) {
          case "incompleted": {
            this.students[i].incompleted += 1;
            break;
          }
          case "NA": {
            this.students[i].notApplicable += 1;
            this.students[i].status = "Homework was not tracked";
            break;
          }
          case "": {
            this.students[i].notApplicable += 1;
            this.students[i].status = "Homework was not tracked";
            break;
          }
          case "completed": {
            this.students[i].completed += 1;
            break;
          }
        }
        this.dashboardState='default';
        this.firebaseService.addAssignment(this.students[i], this.descriptionText, this.students[i].status);
        this.students[i].status = "";
        this.firebaseService.updateStudent(this.students[i]);
      }
      this.descriptionText="";
      this.addToast('Homework was tracked successfully', true);
    }
    else{ 
      this.addToast('Homework was not tracked. Missing information', false)
    }
  }

  addStudent() {
    if (this.formStudentFirstName.invalid || this.formStudentLastName.invalid) {
      this.addStudentFormValidated =false
      this.addToast('Student was not added. Forms are invalid', false);
    }
    else {
      this.addStudentFormValidated =true;
      this.firebaseService.addStudent(this.studentInfo);
      this.addToast('Student was added successfully', true);
      this.dashboardState = 'default';
      this.resetStudentInfo()
    }
  }
  resetStudentInfo() {
    this.studentInfo = {
      firstName: "",
      lastName: "",
      teacher: "",
      studentId: "",
      parentEmail: "",
      incompleted: 0,
      notApplicable: 0,
      completed: 0,
      status: "",
      edit: false
    }
    this.addStudentFormValidated = true;
  }

  resetTrackingStates() {
    for (var i = 0; i <= this.students.length - 1; i++) {
      this.students[i].status = "";
    }
    this.descriptionText = ""
    this.homeworkValidated=true;

  }
  deleteStudent() {
    this.dashboardState = 'default'
    this.firebaseService.deleteStudent(this.studentMarkedForDeletion)
    this.addToast('Student was deleted', true);
  }

  saveStudentChanges(student: studentInfo) {
    if (this.formStudentFirstName.invalid || this.formStudentLastName.invalid) {
      this.addToast('Changes were not saved. Forms are invalid', false);
    }
    else {
      student.edit = false;
      this.dashboardState = 'default'
      student.lastName = this.formStudentLastName.value;
      student.firstName = this.formStudentFirstName.value;
      student.parentEmail = this.formStudentParentEmail.value;
      this.firebaseService.updateStudent(student);
      this.addToast('Changes were saved successfully', true);
    }
  }


  markStudentForDeletion(student: studentInfo) {
    this.studentMarkedForDeletion = student;
  }

  markStudentForInfo(student: studentInfo) {
    this.studentMarkedForInfo = student;
    this.firebaseService.afAuth.authState.subscribe(val => {
      this.firebaseService.getAssignments(val.uid, this.studentMarkedForInfo).valueChanges().subscribe(val => {
        this.assignments = val;

      })
    })

  }


  addToast(message: string, type: boolean) {

    var id = Math.floor(Math.random() * 1000) + 1
    this.toasts.push({
      message: message,
      type: type,
      id: id
    })
    if (type) {
      setTimeout(() => {
        this.removeToastById(id);
      }, 5000)
    }

  }

  removeToastById(idNumber: number) {
    for (var i = 0; i <= this.toasts.length - 1; i++) {
      if (this.toasts[i].id == idNumber) {
        this.toasts.splice(i, 1);
      }
    }

  }
  removeToastByIndex(i: number) {
    this.toasts.splice(i, 1);
  }

  validateHomework() {
    this.homeworkValidated=true;
    for (var i = 1; i <= this.students.length - 1; i++) {
      if (this.students[i].status=="") {
        this.homeworkValidated = false;
      }
    }
    if(this.descriptionText=="")
    {
      this.homeworkValidated = false;
      
    }
  }

}