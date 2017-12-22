import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { EditstudentComponent}  from '../components/editstudent/editstudent.component';

@Injectable()
export class SaveFormsGuard implements CanDeactivate<EditstudentComponent> {

  canDeactivate(component: EditstudentComponent):boolean {
    return component.areFormsSaved();
  }

}