import { forEach } from '@angular/router/src/utils/collection';
import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { studentInfo } from '../../Interfaces/studentInfo';
import { Router } from '@angular/router';
import {SaveFormsGuard} from '../../guards/save-forms-guard';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';


@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.scss']
})
export class EditstudentComponent implements OnInit {
  @ViewChild('f') myForm;
  unsavedInformation: boolean = false;

  private id1: string;
  private id2: string;
  private sub: any;
  private targetURL:string;

  private studentInfo: studentInfo = {
    firstName: "",
    lastName: "",
    teacher: "",
    studentId: ""
  }


  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router,
    private saveFormsGuard: SaveFormsGuard

  ) {
    console.log(this.unsavedInformation);
  }

  ngOnInit() {

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
            }
          }
        })
      }
    })
  }

  saveStudent() {
    this.firebaseService.updateStudent(this.studentInfo);
    this.unsavedInformation = false;
    this.myForm.form.markAsPristine();
    this.router.navigate(['mainPage/']);
  }

  delete() {
    this.firebaseService.deleteStudent(this.studentInfo);
    this.unsavedInformation = false;
    this.router.navigate(['mainPage/']);
  }

  areFormsSaved() {
    if (this.myForm.pristine) {
      this.unsavedInformation = false;
      return true;
    }
    else if (!this.myForm.pristine) {
      this.unsavedInformation = true;
      
      return false;
    }
  }

  cancelAndLeave() {
    this.unsavedInformation = false;
    this.myForm.form.markAsPristine();
    this.router.navigate([this.targetURL]);
  }

  setTargetURL(url:RouterStateSnapshot){
    this.targetURL= url.url;
  }

}
