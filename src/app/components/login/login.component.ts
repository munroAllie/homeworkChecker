import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
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
    private flashMessagesService:FlashMessagesService,
    private router:Router
 
  ) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.firebaseSerice.login(this.email,this.password)
    .then( (user) => {
      this.flashMessagesService.show('You are logged in as '+ user.email, {cssClass:'alert-success', timeout:4000});
      this.router.navigate(["/"]); 
    })
    .catch( (e) => {
      this.flashMessagesService.show(e.message, {cssClass:'alert-danger', timeout:4000});
      this.router.navigate(["login"]); 
    });
  }

}
