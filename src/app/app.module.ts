import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from "angular2-materialize";

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { NavComponent } from './main-panel/nav/nav.component';
import { ProfileComponent } from './main-panel/profile/profile.component';
import { ProfileEditComponent } from './main-panel/profile-edit/profile-edit.component';

import { LoginService } from './services/login.service';
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { LoginNavComponent } from './login/login-nav/login-nav.component';
import { LoginFormComponent } from './login/login-form/login-form.component';

import { NgUploaderModule } from 'ngx-uploader';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '',
    redirectTo: '/login',
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
  { path: 'dashboard', component: MainComponent },
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
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgUploaderModule,
    MaterializeModule
  ],
  providers: [ProfileService,UserService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
