import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireObject } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from "angularfire2/database";
import { studentInfo } from "../Interfaces/studentInfo";

@Injectable()
export class FirebaseService {

  constructor(
    public af: AngularFireDatabase,
    public afAuth: AngularFireAuth) {
  }

  //Gets the list of students from the database depending on the teacherid
  getStudents(teacherId: string) {
    return this.af.list<studentInfo>('/students/' + teacherId) as AngularFireList<studentInfo>;
  }

  //Grabs the userID of who is logged in and saves student under that ID for later. 


  addStudent(studentInfo:studentInfo) {
    this.afAuth.authState.subscribe(auth => {
      this.af.database.ref("/students").child(auth.uid).push(studentInfo)
      .then(val => {
        this.af.database.ref("/students").child(auth.uid).child(val.key).update(
          {
            studentId: val.key
          }
        )
      })
    })
  }

  addAssignment(studentInfo:studentInfo, description:string, status: string){
    this.afAuth.authState.subscribe(auth => {
      this.af.database.ref("/students").child(auth.uid).child(studentInfo.studentId).child("/assignments").push({
        AssignmentDescription: description,
        Status: status
      })
      .then( val =>{
        this.af.database.ref("/students").child(auth.uid).child(studentInfo.studentId).child("/assignments").child(val.key).update({
          assignmentId: val.key
        })
      }) 
    
      })

    }
  

  updateStudent(studentInfo: studentInfo) {
    this.afAuth.authState.subscribe((val) => {
      this.af.database.ref("/students").child(val.uid).child(studentInfo.studentId).update(studentInfo)
    })
  }
  deleteStudent(studentInfo: studentInfo) {
    this.afAuth.authState.subscribe((val) => {
      this.af.database.ref("/students").child(val.uid).child(studentInfo.studentId).remove();
    })
  }

  getAssignments(teacherId:string, studentInfo: studentInfo){
      return this.af.list<any>('/students/' + teacherId+"/"+studentInfo.studentId+"/assignments") as AngularFireList<any>
    }
  
}


