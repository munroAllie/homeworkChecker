import { componentFactoryName } from '@angular/compiler/public_api';
import { FirebaseService } from './services/firebase.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CanActivate, RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AddstudentComponent } from './components/addstudent/addstudent.component';

const appRoutes:Routes =[
  { path: 'mainPage', 
    component: MainPageComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path:'addstudent', component: AddstudentComponent}
      ]
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
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
    DashboardComponent,
    RegisterComponent,
    SideNavBarComponent,
    TopNavBarComponent,
    MainPageComponent,
    AddstudentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
