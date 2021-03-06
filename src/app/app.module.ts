import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { componentFactoryName } from '@angular/compiler/public_api';
import { FirebaseService } from './services/firebase.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CanActivate, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { ClickOutsideModule } from 'ng4-click-outside';
import { RegisterComponent } from './components/register/register.component';




const appRoutes:Routes =[
  { path: 'mainPage', 
    component: MainPageComponent,
    children: [
      {path: '', component: DashboardComponent}
      ]
  },
  { path: 'login', component: LoginComponent},
  { path: '',   redirectTo: '/mainPage', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent}
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
    DashboardComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ClickOutsideModule
  ],
  providers: [
    FirebaseService, AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
