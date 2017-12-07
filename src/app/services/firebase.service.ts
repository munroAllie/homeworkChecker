import { Injectable } from '@angular/core';
import{ AngularFireAuth} from 'angularfire2/auth';
import { AngularFireList, AngularFireObject } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from "angularfire2/database"; 
import{studentInfo} from "../Interfaces/studentInfo";

@Injectable()
export class FirebaseService {



  constructor(
    public afAuth: AngularFireAuth,
    public  af: AngularFireDatabase
  ) { 
 }


 //Registers the user so that they can log in.
 register(username:string, email:string, password:string)
 {
   return new Promise ((resolve, reject) =>{
     this.afAuth.auth.createUserWithEmailAndPassword(email,password)
     .then( userData => resolve(userData.uid), 
     err => reject(err))// end .then statement
     });//end of Promise
  }//register end

// Adds the user to the database so that their userID can be used to find students associated with that ID
  addUser(userId:string, username:string, email:string, password:string){
   this.af.database.ref('/users').child(userId).set({
     userId:userId,
     username:username,
     email:email,
     password:password
   })
 }

//logins in the user
  login(email:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

//Logs the user out of the session
  logout(){
    return this.afAuth.auth.signOut();
  }
 
// Checks to see if user is logged in. The dashboard subscribes to this method to "watch" for login/logout changes
  isLoggedIn():Observable<boolean>{
    return this.afAuth.authState.map(auth => {
      if(!auth){ 
        return false;
      } else {
        return true;
       }

    })
  }

  //Grabs the userID of who is logged in and saves student under that ID for later.
  addStudent(firstName:string, lastName:string){
    this.afAuth.authState.subscribe( auth =>{
      this.af.database.ref("/students").child(auth.uid).push({
        Teacher:auth.uid,
        FirstName:firstName,
        LastName:lastName
      })
    })
  }
  
  //Gets the list of students from the database depending on the teacherid
  getStudents(teacherId:string)
  {   
      return this.af.list<studentInfo[]>('/students/'+teacherId) as AngularFireList<studentInfo[]>; 
  }
}
