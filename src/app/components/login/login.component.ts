import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private email:string;
  private password:string;
  
  constructor(
    private firebaseSerice:FirebaseService
 
  ) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.firebaseSerice.login(this.email,this.password)
    .then( (user) => {
      console.log("This is goog:"+ user);
    })
    .catch( (e) => {
      console.log("This is the error: "+ e);
    });
  }

}
