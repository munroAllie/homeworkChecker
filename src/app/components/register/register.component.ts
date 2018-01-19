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
  public user$ = this.authService.user;
  public isLoggedIn:boolean;

  private email:string;
  private password:string;

  constructor(
    private firebaseSerice:FirebaseService,
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


}
