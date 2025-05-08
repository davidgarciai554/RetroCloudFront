import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  private getUserFromStorage() {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        token,
        username: payload.sub,
        role: payload.role
      };
    } catch (e) {
      return { token };
    }
}

  login(token: string) {
    localStorage.setItem('authToken', token);
    this.currentUserSubject.next(this.getUserFromStorage());
  }

  logout() {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Si necesitas saber si es admin, puedes decodificar el token y revisar el rol
  isAdmin(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'admin';
    } catch (e) {
      return false;
    }
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }
}
