import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { ConsoleListComponent } from './components/console-list/console-list.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { UploadGameComponent } from './components/upload-game/upload-game.component';
import { RoleSelectorComponent } from './components/role-selector/role-selector.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchManagerComponent } from './components/search-manager/search-manager.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: CompanyListComponent },
  { path: 'company/:companyId/consoles', component: ConsoleListComponent },
  { path: 'console/:consoleId/games', component: GameListComponent },
  { path: 'upload', component: UploadGameComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    ConsoleListComponent,
    GameListComponent,
    UploadGameComponent,
    RoleSelectorComponent,
    SearchBarComponent,
    SearchManagerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
