import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //Holds the values from the form 
private username:string;
private email:string;
private password:string;

  constructor(

    private firebaseService:FirebaseService, 
    private router:Router
  ) { }

  ngOnInit() {
  }

  // When the user clicks register they are registers to the authentication and then added to the user database
  OnSubmit()
  {
    console.log("Register has been clicked");
    //register the user
    this.firebaseService.register(this.username,this.email,this.password)
    .then( (res) =>{
      console.log("User has been added to authentication")
      //add user to database
        this.firebaseService.addUser(<string>res,this.username,this.email,this.password);
        this.router.navigate(["/mainPage"]);
       
    })
    .catch( (err)=> {
      console.log(err);
      this.router.navigate(["/register"]);
     
    });
  
  }
}

