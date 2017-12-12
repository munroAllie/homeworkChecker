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

  constructor(
    private firebaseService:FirebaseService
  ) { }

  ngOnInit() {
  }

  addStudent(){
    this.firebaseService.addStudent(this.firstName,this.lastName);
  }
}
