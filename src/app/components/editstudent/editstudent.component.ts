import { forEach } from '@angular/router/src/utils/collection';
import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { studentInfo } from '../../Interfaces/studentInfo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.scss']
})
export class EditstudentComponent implements OnInit {
@ViewChild('f') form;
unsavedInformation: boolean = false;

  private id1: string;
  private id2: string;
  private sub: any;

  private studentInfo: studentInfo = {
    firstName: "",
    lastName: "",
    teacher: "",
    studentId: ""
  }


  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router

  ) { 
    console.log(this.unsavedInformation);
  }

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.id1 = params['id1'];
      this.id2 = params['id2'];
    });
    this.getStudents();
    console.log(this.unsavedInformation);
  }

  getStudents() {
    this.firebaseService.afAuth.authState.subscribe((val) => {
      if (val != null) {
        this.firebaseService.getStudents(val.uid).valueChanges().subscribe((list) => {
          for (var i = 0; i < list.length; i++) {
            if ((this.id1 == list[i].firstName) && (this.id2 == list[i].lastName)) {
              this.studentInfo = list[i];
            }
          }
        })
      }
    })
  }

  saveStudent() {
    this.firebaseService.updateStudent(this.studentInfo);
    this.unsavedInformation = false;
    this.router.navigate(['mainPage/']);
  }

  delete() {
    this.firebaseService.deleteStudent(this.studentInfo);
    this.unsavedInformation = false;
    this.router.navigate(['mainPage/']);
  }
  areFormsSaved(){
    if(this.form.pristine){
      this.unsavedInformation = false;
      console.log(this.unsavedInformation);
      return true;
    }
    else if(!this.form.pristine)
    {
      this.unsavedInformation = true;
      console.log(this.unsavedInformation);
      return false;
    }
   
  }
}
