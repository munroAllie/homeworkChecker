import { Injectable } from '@angular/core';
import{ AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

//logins in the user
  login(email:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.afAuth.auth.signOut();
  }
 
  isLoggedIn():Observable<boolean>{
    return this.afAuth.authState.map(auth => {
      if(!auth){ 
        return false;
      } else {
        return true;
       }

    })
  }
}
