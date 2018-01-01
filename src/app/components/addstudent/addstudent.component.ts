import { Form } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { studentInfo } from '../../Interfaces/studentInfo';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent implements OnInit {
  private studentInfo: studentInfo = {
    firstName: "",
    lastName: "",
    teacher: "",
    studentId: "",
    parentEmail: "",
    incompleted: 0, 
    attempted: 0,
    completed: 0
  }
private firstName:string = "";
private lastName:string = "";
private hasChanged: boolean = false;


  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
  
  }


  clearFields(){
    this.firstName = null;
    this.lastName = null;
  }
  addStudent(){
   this.firebaseService.addStudent(this.studentInfo);
    this.router.navigate(['mainPage/editstudent', this.studentInfo.firstName, this.studentInfo.lastName])
  }

  


}
