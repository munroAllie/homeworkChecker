import { AngularFireDatabase } from "angularfire2/database"; 
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import{ AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ObserveOnSubscriber } from "rxjs/operators/observeOn";



@Injectable()
export class AuthService {

  public user: Observable<firebase.User>

  constructor(
    public afAuth: AngularFireAuth, 
    public af: AngularFireDatabase,
    private router:Router) { 
    this.user = afAuth.authState;
      
    }
    loginWithGoogle(){
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    isAuthenticated() :Observable<boolean> {
      return this.user.map( val => val && val.uid !== undefined);
      }
    
    logout() {
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    }
}
