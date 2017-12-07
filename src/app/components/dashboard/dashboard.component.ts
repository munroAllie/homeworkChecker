import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

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
    private router:Router
  ) {}

  ngOnInit() {

    //Checked to see if the user is logged in. 
    this.firebaseService.isLoggedIn().subscribe((val)=>{
      this.isLoggedIn = val;
      //If they aren't then they are sent to login page
      if(!val)
      {
        this.router.navigate(["/login"]);
      }
    })
    //Grabs the list of student on initilize
    this.getStudents();
 }

    //Logs the user out when the logout button is clicked
  logout() {
    this.firebaseService.logout()
    .catch ( (e)=>{
      console.log(e.message); //Diplays any errors when trying to log out
    })
  }
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
  
}
