import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { EditstudentComponent}  from '../components/editstudent/editstudent.component';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class SaveFormsGuard implements CanDeactivate<EditstudentComponent> {

  canDeactivate(
    component: EditstudentComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState:RouterStateSnapshot
  
  ):boolean {
    component.setTargetURL(nextState);
 
  return component.areFormsSaved();
  }

}