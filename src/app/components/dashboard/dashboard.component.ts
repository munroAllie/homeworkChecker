import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  editMode:boolean;
  isLoggedIn:boolean; //Holds the booleane for if the user is logged in
  firstName:string;
  lastName:string;
  
  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
    //checks to see if the user is logged in. Is always checking to see if the user is logged in.
    this.firebaseService.isLoggedIn().subscribe((val)=>{
      this.isLoggedIn = val;
      if(!val)
      {
        this.router.navigate(["/login"]); //Sends the user to the login page if they are not logged in.
      }
    })
    
  }
  logout() {
    this.firebaseService.logout()
    .then ( ()=>{
      console.log("You have been logged out") //User is sent to the login page already
    })
    .catch ( (e)=>{
      console.log(e.message);
    })
  }

  addStudent(){
        this.firebaseService.addStudent(this.firstName,this.lastName);
        this.firstName = null;
        this.lastName = null;
  }
    

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

}
