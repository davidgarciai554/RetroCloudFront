import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notifications.asObservable();
  private counter = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = this.counter++;
    const notification: Notification = { message, type, id };
    
    this.notifications.next([...this.notifications.value, notification]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      this.remove(id);
    }, 5000);
  }

  remove(id: number) {
    const currentNotifications = this.notifications.value;
    this.notifications.next(currentNotifications.filter(n => n.id !== id));
  }
}
