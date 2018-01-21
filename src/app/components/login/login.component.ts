import { isSuccess } from '@angular/http/src/http_utils';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user$ = this.authService.user;
  public isLoggedIn:boolean;

  public email:string;
  public password:string;
  public errorMessage:string;
  
  constructor(
    public firebaseSerice:FirebaseService,
    public authService:AuthService,
    public router:Router
 
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
  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }

  login(){
    this.authService.login(this.email,this.password).then( (res) =>{

    })
    .catch( (err)=>{
      this.errorMessage = err.message;

    })
    
  }

  goToRegister(){
    this.router.navigate(['register']);
  }

}
