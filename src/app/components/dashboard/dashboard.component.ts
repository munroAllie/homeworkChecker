import { print } from 'util';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { studentInfo } from '../../Interfaces/studentInfo';
import { Subscription } from 'rxjs/Subscription';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {


  @ViewChild('f') statusForm;
  @ViewChild('description') description;
  private studentMarkedForDeletion:studentInfo;
  private studentMarkedForInfo:studentInfo;
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
  private assignments:any[]

  dashboardState:string="default";
  addStudentState:boolean = false;
  trackingState:boolean = false;
  createAssignmentState:boolean = false;
  isLoggedIn: boolean; //Holds the boolean for if the user is logged in
  students: studentInfo[];
  track: Subscription;
  descriptionText:string = "";

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
        this.firebaseService.getStudents(val.uid).valueChanges().subscribe( val =>{
        this.students=val;
        });
        
      }
    })
  }

  recordStudents() {
    for( var i = 0; i<=this.students.length-1;i++){
      console.log(this.descriptionText)
      switch(this.students[i].status){
          case "incompleted":{
          this.students[i].incompleted +=1;
          break;
        }
        case "NA":{
          this.students[i].notApplicable +=1;
          this.students[i].status = "Homework was not tracked";
          break;
        }
        case "":{
          this.students[i].notApplicable +=1;
          this.students[i].status = "Homework was not tracked";
          break;
        }
        case "completed":{
          this.students[i].completed +=1;
          break;
        }
      }

      this.firebaseService.addAssignment(this.students[i], this.descriptionText, this.students[i].status);
      this.students[i].status="";
      this.firebaseService.updateStudent(this.students[i]);
    }
      //this.resetTrackingStates();
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
      notApplicable: 0,
      completed: 0,
      status:"",
      edit: false
    }
  }

  resetTrackingStates(){
    for(var i = 0; i<=this.students.length-1;i++){
      this.students[i].status = "";
  }
    this.descriptionText =""

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

  markStudentForInfo(student:studentInfo){
    this.studentMarkedForInfo = student;
    this.firebaseService.afAuth.authState.subscribe( val =>{
       this.firebaseService.getAssignments(val.uid,this.studentMarkedForInfo).valueChanges().subscribe(val=>{
        this.assignments = val;
        console.log(this.assignments)
       
      })
    })

  }
}