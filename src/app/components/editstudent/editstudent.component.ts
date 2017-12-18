import { forEach } from '@angular/router/src/utils/collection';
import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { studentInfo } from '../../Interfaces/studentInfo';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.scss']
})
export class EditstudentComponent implements OnInit {
  private id1: string;
  private id2: string;
  private sub: any;
  private studentFound: boolean = false;

  private studentInfo: studentInfo = {
    firstName: "",
    lastName: "",
    teacher: "",
    studentId: ""
  }
  private tempStudentInfo: studentInfo = {
    firstName: "",
    lastName: "",
    teacher: "",
    studentId: ""
  }

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.studentFound = false;
    this.sub = this.route.params.subscribe(params => {
      this.id1 = params['id1'];
      this.id2 = params['id2'];
    });
    this.getStudents();
  }

  getStudents() {
    this.firebaseService.afAuth.authState.subscribe((val) => {
      if (val != null) {
        this.firebaseService.getStudents(val.uid).valueChanges().subscribe((list) => {
          for (var i = 0; i < list.length; i++) {
            if ((this.id1 == list[i].firstName) && (this.id2 == list[i].lastName)) {
              this.studentInfo = list[i];
              this.studentFound = true; 
            }
          }
        })
      }
    })
  }

  saveStudent(){
    this.firebaseService.updateStudent(this.studentInfo);
    console.log("student Saved");
    console.log("this is the student Info:",this.studentInfo);
    console.log("this is the tempstudentInfo:",this.tempStudentInfo);
  }

}
