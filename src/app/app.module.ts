import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { ConsoleListComponent } from './components/console-list/console-list.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { UploadGameComponent } from './components/upload-game/upload-game.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'companies', 
    component: CompanyListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'company/:companyId/consoles', 
    component: ConsoleListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'console/:consoleId/games', 
    component: GameListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'upload', 
    component: UploadGameComponent,
    canActivate: [AuthGuard],
    data: { requiresAdmin: true }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    ConsoleListComponent,
    GameListComponent,
    UploadGameComponent,
    SearchBarComponent,
    LoginComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
