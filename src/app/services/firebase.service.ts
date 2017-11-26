import { Injectable } from '@angular/core';
import{ AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class FirebaseService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }


  login(email:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
