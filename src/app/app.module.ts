import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { MaterializeModule } from "angular2-materialize";
// import { AuthService } from 'angular2-google-login';

import { EmailValidator } from './validators/valid-email';
import { PasswordValidator } from './validators/valid-password';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { NavComponent } from './main-panel/nav/nav.component';
import { ProfileComponent } from './main-panel/profile/profile.component';
import { ProfileEditComponent } from './main-panel/profile-edit/profile-edit.component';

import { ContactService } from './services/contact.service';
import { LoginService } from './services/login.service';
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';
import { CustomValidators } from './validators/custom-validators';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { LoginNavComponent } from './login/login-nav/login-nav.component';
import { LoginFormComponent } from './login/login-form/login-form.component';

import { NgUploaderModule } from 'ngx-uploader';
import { DashboardComponent } from './main-panel/dashboard/dashboard.component';
import { CardUserComponent } from './card-user/card-user.component';
import { ContactsComponent } from './main-panel/contacts/contacts.component';
import { AlertModalComponent } from './modals/alert-modal/alert-modal.component';
import { SearchNavComponent } from './main-panel/nav/search-nav/search-nav.component';
import { LoginRegisterComponent } from './login/login-register/login-register.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LoginFormComponent
      }
    ]
  },
  {
    path: 'register',
    component: LoginComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LoginRegisterComponent
      },
      {
        path: ':token',
        component: LoginRegisterComponent
      },
    ]
  },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: MainComponent,
    data: { title: 'Perfil' },
    children: [
      {
        path: '',
        redirectTo: 'me/edit',
        pathMatch: 'full',
      },
      {
        path: ':user',
        component: ProfileComponent,
        data: { title: 'Nombre Apellidos' }
      },
      {
        path: 'me/edit',
        component: ProfileEditComponent,
        data: { title: 'Nombre Apellidos' }
      }
    ]
  },
  {
    path: 'dashboard',
    component: MainComponent,
    data: { title: "Escritorio" },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
      }
    ]
  },
  {
    path: 'contacts',
    component: MainComponent,
    data: { title: "Contactos" },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ContactsComponent
      }
    ]
  },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainPanelComponent,
    NavComponent,
    ProfileComponent,
    ProfileEditComponent,
    LoginComponent,
    MainComponent,
    LoginNavComponent,
    LoginFormComponent,
    DashboardComponent,
    CardUserComponent,
    ContactsComponent,
    EmailValidator,
    PasswordValidator,
    AlertModalComponent,
    SearchNavComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    NgUploaderModule,
    MaterializeModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},ProfileService,UserService,LoginService,ContactService,CustomValidators],
  bootstrap: [AppComponent]
})
export class AppModule { }
