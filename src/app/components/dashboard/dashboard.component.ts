import { print } from 'util';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  editMode:boolean; //Holds the value to determine if we are in add user mode
  isLoggedIn:boolean; //Holds the boolean for if the user is logged in
  firstName:string;
  lastName:string;
  
  students: Observable<any[]>;
  userId:string;

  constructor(
    private firebaseService:FirebaseService,
    private authService:AuthService,
    private router:Router
  ) {}
  ngOnInit() {
  }
    //Logs the user out when the logout button is clicked

    //Adds the student to the database under the firstName, lastName and also stores the teacher's Id
  addStudent(){
        this.firebaseService.addStudent(this.firstName,this.lastName);
        this.firstName = null;
        this.lastName = null;
  }
    //Toggles edit mode if the add student button is clicked
  toggleEditMode(){
    this.editMode = !this.editMode;
  }
    //Retrives the student list by sending the teacher ID as a parameter when searching the database.
  getStudents()
  {
    this.firebaseService.afAuth.authState.subscribe( (val)=>
    {
      if(val != null)
      this.students = this.firebaseService.getStudents(val.uid).valueChanges();
    })
  }
  logout(){
    this.authService.logout();
  }
  
}
