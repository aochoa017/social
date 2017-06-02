import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { NavComponent } from './main-panel/nav/nav.component';
import { ProfileComponent } from './main-panel/profile/profile.component';

import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainPanelComponent,
    NavComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
