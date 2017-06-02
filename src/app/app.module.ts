import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { NavComponent } from './main-panel/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainPanelComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
