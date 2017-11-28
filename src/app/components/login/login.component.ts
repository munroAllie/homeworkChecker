import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private email:string;
  private password:string;
  
  constructor(
    private firebaseSerice:FirebaseService,
    private router:Router
 
  ) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.firebaseSerice.login(this.email,this.password)
    .then( (user) => {
      
      this.router.navigate(["/"]); 
    })
    .catch( (e) => {
 
      this.router.navigate(["login"]); 
    });
  }

}
