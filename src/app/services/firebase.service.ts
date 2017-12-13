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
    public  af: AngularFireDatabase,
    public afAuth: AngularFireAuth) { 
  }

  //Gets the list of students from the database depending on the teacherid
  getStudents(teacherId:string) {   
    return this.af.list<studentInfo>('/students/'+teacherId) as AngularFireList<studentInfo>; 
    }

      //Grabs the userID of who is logged in and saves student under that ID for later.
  addStudent(firstName:string, lastName:string) {
    this.afAuth.authState.subscribe( auth =>{
      this.af.database.ref("/students").child(auth.uid).push({
        teacher:auth.uid,
        firstName:firstName,
        lastName:lastName
      })
    })
  }

}

  
