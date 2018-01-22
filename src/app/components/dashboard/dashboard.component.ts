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

  //Gives access to the forms from the DOM
  @ViewChild('studentLastName') formStudentLastName;
  @ViewChild('studentFirstName') formStudentFirstName;
  @ViewChild('studentParentEmail') formStudentParentEmail;
  @ViewChild('description') description;

  //Stored information temporarily for various students.
  public studentMarkedForDeletion: studentInfo;
  public studentMarkedForInfo: studentInfo
  public studentInfo: studentInfo = {
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

  //Initializes the arrays for assignment and toast notifcations.
  public assignments: any[];
  public toasts: toasts[] = [];

  //Stores the boolean states for the forms
  public homeworkValidated: boolean = true;
  public homeworkPristine: boolean = true;
  public addStudentFormValidated: boolean = true;

  //Stores the percentage value for the studentInfoModal
  public percentage: any;
  public studentInfoModalPopUpShow: boolean = false;

  public dashboardState: string = "default"; //This value is set and acts as the programs state variable.
  public students: studentInfo[]; //Stores all of the students from the database
  public descriptionText: string = ""; //Description text for the homework input field


  constructor(
    //Sets references to inported components
    public firebaseService: FirebaseService,
    public authService: AuthService,
    public router: Router
  ) {

    //Checks to see if the user is logged in continously and redirects them to the login page if not.
    this.authService.isAuthenticated().subscribe(
      success => {
        if (!success) {
          this.router.navigate(['login']);
        }
      })
  }


  ngOnInit() {
    this.getStudents();
  }

  //Retrieves the student list by sending the teacher ID as a parameter when searching the database.
  getStudents() {
    this.firebaseService.afAuth.authState.subscribe((val) => {
      if (val != null) {
        this.firebaseService.getStudents(val.uid).valueChanges().subscribe(val => {
          this.students = val; //All of the students are stored in a local variable array
        });

      }
    })
  }

  // Records all of the students' status from the homework tracking. 
  recordStudents() {
    this.validateHomework(); //checks homework validity
    if (this.homeworkValidated) { //if the homework field is valid...
      for (var i = 0; i <= this.students.length - 1; i++) {
        //Checks to see what the user set each student to and updates their status local values before sending to database
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
        this.dashboardState = 'default';
        this.firebaseService.addAssignment(this.students[i], this.descriptionText, this.students[i].status); //Adds the assignment to each student in the database
        this.students[i].status = ""; //Resets the indiviual student status back to blank for next tracking request
        this.firebaseService.updateStudent(this.students[i]);
      }
      this.descriptionText = ""; //Resets the assignment name to blank for the next tracking request
      this.addToast('Homework was tracked successfully', true);
    }
    else {
      this.addToast('Homework was not tracked. Missing information', false)
    }
  }

  //Addes the student to the database if the forms are valid.
  addStudent() {
    if (this.formStudentFirstName.invalid || this.formStudentLastName.invalid) {
      this.addStudentFormValidated = false
      this.addToast('Student was not added. Forms are invalid', false);
    }
    else {
      this.addStudentFormValidated = true;
      this.firebaseService.addStudent(this.studentInfo);
      this.addToast('Student was added successfully', true);
      this.dashboardState = 'default';
      this.resetStudentInfo()
    }
  }
  // Sets the default student (for add student field) back to blank for the next add student request
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

  // Resets all of the tracking states back to blank for the next tracking state request
  resetTrackingStates() {
    for (var i = 0; i <= this.students.length - 1; i++) {
      this.students[i].status = "";
    }
    this.descriptionText = ""
    this.homeworkValidated = true;

  }
  // Deletes the student from the database that has been marked for deletion
  deleteStudent() {
    this.dashboardState = 'default'
    this.firebaseService.deleteStudent(this.studentMarkedForDeletion)
    this.addToast('Student was deleted', true);
  }

  //Updates student changes to the database if the forms are valid.
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

  //temporality holds the student to be marked for deletion while the program waits for the user to confirm.
  markStudentForDeletion(student: studentInfo) {
    this.studentMarkedForDeletion = student;
  }

  //Stores the student who has been selected to show additional information in a modal.
  markStudentForInfo(student: studentInfo) {
    this.studentMarkedForInfo = student;
    if ((this.studentMarkedForInfo.completed + this.studentMarkedForInfo.incompleted) == 0) {
      this.percentage = "N/A"; //If there is not assignments set the percentage to N/A
    } else {
      //Calculates the percentage for the student
      this.percentage = Math.round(this.studentMarkedForInfo.completed / (this.studentMarkedForInfo.completed + this.studentMarkedForInfo.incompleted) * 100)
    }
    //Gets all of the assignments that have been completed for this student
    this.firebaseService.afAuth.authState.subscribe(val => {
      this.firebaseService.getAssignments(val.uid, this.studentMarkedForInfo).valueChanges().subscribe(val => {
        this.assignments = val;

      })
    })

  }

  //Adds toast notifications to the toast array. There are two types : Red(false) and Green(true)
  addToast(message: string, type: boolean) {
    //assigns a random ID to each toast so that they may be deleted using this reference number
    var id = Math.floor(Math.random() * 10000) + 1
    this.toasts.push({
      message: message,
      type: type,
      id: id
    })
    //if it is a green toast delete it after 5 seconds
    if (type) {
      setTimeout(() => {
        this.removeToastById(id);
      }, 5000)
    }

  }
  //Removes toast by ref ID
  removeToastById(idNumber: number) {
    for (var i = 0; i <= this.toasts.length - 1; i++) {
      if (this.toasts[i].id == idNumber) {
        this.toasts.splice(i, 1);
      }
    }

  }
  //Removes toast by index value (This is for when the user clicks the close button on a toast)
  removeToastByIndex(i: number) {
    this.toasts.splice(i, 1);
  }

  //Checks that all of the homework fields have been completed and not invalid
  validateHomework() {
    this.homeworkValidated = true;
    for (var i = 0; i <= this.students.length - 1; i++) {
      if (this.students[i].status == "") {
        this.homeworkValidated = false;
      }
    }
    if (this.descriptionText == "") {
      this.homeworkValidated = false;

    }
  }
  //Ensures that the confirmation cancel tracking modal doesn't appear when no tracking has been done in the first place
  checkHomeworkPristine() {
    for (var i = 0; i <= this.students.length - 1; i++) {
      if (this.students[i].status != "") {
        this.homeworkPristine = false;
      }
    }
    if (this.descriptionText != "") {
      this.homeworkPristine = false;
    }
    if (this.homeworkPristine == false) {
      this.dashboardState = 'cancelHomeworkModal'
      this.homeworkPristine = true;
    }
    else {
      this.dashboardState = 'default'
      this.homeworkPristine = true;
    }

  }

}