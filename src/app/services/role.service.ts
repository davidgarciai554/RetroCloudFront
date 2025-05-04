import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserRole = 'user' | 'admin';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private currentRoleSubject = new BehaviorSubject<UserRole>('user');
  currentRole$: Observable<UserRole> = this.currentRoleSubject.asObservable();

  constructor() {
    // Try to load saved role from localStorage
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole) {
      this.currentRoleSubject.next(savedRole);
    }
  }

  getCurrentRole(): UserRole {
    return this.currentRoleSubject.value;
  }

  setRole(role: UserRole): void {
    // Save role to localStorage for persistence
    localStorage.setItem('userRole', role);
    this.currentRoleSubject.next(role);
    console.log('Role set to:', role); // Debug log
  }

  isAdmin(): boolean {
    return this.currentRoleSubject.value === 'admin';
  }
}
