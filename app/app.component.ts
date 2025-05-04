import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedRole: string = 'user';

  constructor(private router: Router) {}

  onRoleChange(role: string) {
    this.selectedRole = role;
  }

  onAddGame() {
    this.router.navigate(['/upload']);
  }
}
