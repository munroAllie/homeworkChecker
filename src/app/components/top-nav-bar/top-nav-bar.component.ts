import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  constructor(
    private firebaseService:FirebaseService
  ) { }

  ngOnInit() {
  }


    //Logs the user out when the logout button is clicked
    logout() {
      this.firebaseService.logout()
      .catch ( (e)=>{
        console.log(e.message); //Diplays any errors when trying to log out
      })
    }
}
