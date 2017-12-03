import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
private firstName : string;
private lastName: string;

  constructor(
    private firebaseService:FirebaseService
  ) { }

  ngOnInit() {
  }

  addStudent(){

    this.firebaseService.addStudent(this.firstName,this.lastName);
    this.firstName = null;
    this.lastName = null;
  }

}
