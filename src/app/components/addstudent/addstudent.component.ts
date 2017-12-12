import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent implements OnInit {
private firstName:string;
private lastName:string;
private hasChanged: boolean = false;

  constructor(
    private firebaseService:FirebaseService
  ) { }

  ngOnInit() {
  
  }


  clearFields(){
    this.firstName = null;
    this.lastName = null;
  }
  addStudent(){
    
    this.firebaseService.addStudent(this.firstName,this.lastName);
    this.clearFields();
  }
}
