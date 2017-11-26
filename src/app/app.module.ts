import { FirebaseService } from './services/firebase.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const appRoutes:Routes =[
  { path: '', component: DashboardComponent},
  { path: 'login', component: LoginComponent}
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
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
