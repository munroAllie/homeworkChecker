import { isSuccess } from '@angular/http/src/http_utils';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private errorMessage:string = "";
  private email:string;
  private password:string;

  constructor(
    private firebaseService:FirebaseService,
    private authService:AuthService,
    private router:Router
 
  ) {
    this.authService.isAuthenticated().subscribe(
      success => { 
      if(success) {
        this.router.navigate(['mainPage']);
        }
      })
    }
  ngOnInit() {
  }

  register(){
    this.authService.register(this.email,this.password).then( (res) =>{
      console.log(res)
    })
    .catch( (err)=>{
      this.errorMessage = err.message;
      console.log(err.message);
    })
  }
  login(){
    this.router.navigate(['login']);
  }

}
