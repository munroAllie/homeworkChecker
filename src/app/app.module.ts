import { componentFactoryName } from '@angular/compiler/public_api';
import { FirebaseService } from './services/firebase.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import {PopupModule} from 'ng2-opd-popup';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AddstudentComponent } from './components/addstudent/addstudent.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { EditstudentComponent } from './components/editstudent/editstudent.component';

import {SaveFormsGuard} from './guards/save-forms-guard';

const appRoutes:Routes =[
  { path: 'mainPage', 
    component: MainPageComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path:'addstudent', component: AddstudentComponent},
      {path:'editstudent/:id1/:id2', 
        component: EditstudentComponent,
        canDeactivate:[SaveFormsGuard]  
      }
      ]
  },
  { path: 'login', component: LoginComponent},
  { path: '',   redirectTo: '/mainPage', pathMatch: 'full' },
]

const firebaseConfig ={
  apiKey: "AIzaSyCCFtzS1ozRdIviYgbZwIjR6vzcxVe5AkI",
  authDomain: "homeworkchecker-920ea.firebaseapp.com",
  databaseURL: "https://homeworkchecker-920ea.firebaseio.com",
  projectId: "homeworkchecker-920ea",
  storageBucket: "homeworkchecker-920ea.appspot.com",
  messagingSenderId: "623701152174"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavBarComponent,
    TopNavBarComponent,
    MainPageComponent,
    AddstudentComponent,
    DashboardComponent,
    EditstudentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
    PopupModule.forRoot()
  ],
  providers: [
    FirebaseService, AuthService, SaveFormsGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
