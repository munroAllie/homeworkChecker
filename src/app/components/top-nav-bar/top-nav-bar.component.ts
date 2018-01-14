import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {
  private menuToggle:boolean = false;
  private userName:string;
  constructor(
    private firebaseService:FirebaseService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    if(this.userName = null){
      this.userName = "loading username..."
    }
    this.getUserName();
  }

  logout(){
    this.userName = "logging out";
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  getUserName(){
    this.authService.afAuth.authState.subscribe(val=>{
      if(val){
      this.userName = val.displayName;
      }
    })
  }
  onClickedOutside($event){
    if(this.menuToggle){
      this.menuToggle=false;
    }
  }
}
