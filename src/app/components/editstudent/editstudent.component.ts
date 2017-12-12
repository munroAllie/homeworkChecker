import { forEach } from '@angular/router/src/utils/collection';
import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.scss']
})
export class EditstudentComponent implements OnInit {
private id1: string;
private id2: string;
private sub: any;
private students: any[];
private student: any;
private studentFound: boolean 

private firstName: string;
private lastName:string;
private teacherId:string;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
   

  ) { }

  ngOnInit() {
    this.studentFound = false;
    this.sub = this.route.params.subscribe(params => {
      this.id1 = params['id1']; // (+) converts string 'id' to a number
      this.id2 = params['id2'];
      // In a real app: dispatch action to load the details here.
   });

   this.getStudents();


  }

  getStudents()
  {
    this.firebaseService.afAuth.authState.subscribe( (val)=>
    {
      if(val != null)
      this.firebaseService.getStudents(val.uid).valueChanges().subscribe( (list)=>{
        for (var i = 0; i<list.length; i++)
        {
//          if ((list[i].FirstName == this.id1) && (list[i].LastName == this.id2)) {
 //           this.studentFound = true;
 //           this.firstName = list[i].FirstName;
 //           this.lastName = list[i].LastName;
  //          this.teacherId = list[i].Teacher;
   //       }
        }
      })
     
    })
  }  

}
