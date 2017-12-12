import { Form } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent implements OnInit {
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
    this.firebaseService.addStudent(this.firstName,this.lastName);
    this.router.navigate(['mainPage/editstudent', this.firstName, this.lastName])
  }


}
