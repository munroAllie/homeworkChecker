import { print } from 'util';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { studentInfo } from '../../Interfaces/studentInfo';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {


  @ViewChild('f') statusForm;
  @ViewChild('description') description;
  private studentMarkedForDeletion:studentInfo;
  private studentInfo: studentInfo = {
    firstName: "",
    lastName: "",
    teacher: "",
    studentId: "",
    parentEmail: "",
    incompleted: 0, 
    attempted: 0,
    completed: 0,
    edit: false
  }
  dashboardState:string="default";
  addStudentState:boolean = false;
  trackingState:boolean = false;
  createAssignmentState:boolean = false;
  isLoggedIn: boolean; //Holds the boolean for if the user is logged in
  students: Observable<any[]>;
  status: string[] = ["incompleted", "attempted", "completed"];
  track: Subscription;
  descriptionText:string = "Please type in a decription here...";

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
        this.students = this.firebaseService.getStudents(val.uid).valueChanges();
        
      }
    })
  }

  recordStudents() {
    this.track = this.students.subscribe((val) => {
      val = val as studentInfo[]
      for (var i = 0; i < val.length; i++) {
      var tempName = val[i].firstName + val[i].lastName +"status";
      var status = this.statusForm.value.status[tempName];
      switch(status){
        case "incompleted":{
          val[i].incompleted +=1;
          break;
        }
        case "attempted":{
          val[i].attempted +=1;
          break;
        }
        case "completed":{
          val[i].completed +=1;
          break;
        }
      }
      this.firebaseService.updateStudent(val[i]);
      if(status=="")
      status="Homework not tracked";
      this.firebaseService.addAssignment(val[i], this.descriptionText, status);
      }
      this.trackingState=false;
      this.track.unsubscribe();
    }
  )
    
  }

  addStudent(){
    this.firebaseService.addStudent(this.studentInfo);
    this.dashboardState='default';
    this.resetStudentInfo()
   }
  resetStudentInfo(){
    this.studentInfo ={
      firstName: "",
      lastName: "",
      teacher: "",
      studentId: "",
      parentEmail: "",
      incompleted: 0, 
      attempted: 0,
      completed: 0,
      edit: false
    }

  }

  deleteStudent(){
    this.dashboardState='default'
    this.firebaseService.deleteStudent(this.studentMarkedForDeletion);
  }

  saveStudentChanges(student:studentInfo){
    student.edit = false;
    this.dashboardState='default'
    this.firebaseService.updateStudent(student);
  }
  markStudentForDeletion(student:studentInfo){
    this.studentMarkedForDeletion = student;
  }
}