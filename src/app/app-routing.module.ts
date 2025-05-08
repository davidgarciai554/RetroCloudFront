import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { ConsoleListComponent } from './components/console-list/console-list.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { UploadGameComponent } from './components/upload-game/upload-game.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'companies', component: CompanyListComponent, canActivate: [AuthGuard] },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }