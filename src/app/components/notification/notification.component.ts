import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../../services/notification.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-notification',
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-4">
      <div *ngFor="let notification of notifications"
           [@slideIn]
           class="p-4 rounded-lg shadow-lg max-w-md transform transition-all duration-300"
           [ngClass]="{
             'bg-green-500': notification.type === 'success',
             'bg-red-500': notification.type === 'error',
             'bg-blue-500': notification.type === 'info'
           }">
        <div class="flex items-center space-x-3">
          <i class="fas"
             [ngClass]="{
               'fa-check-circle': notification.type === 'success',
               'fa-exclamation-circle': notification.type === 'error',
               'fa-info-circle': notification.type === 'info'
             }"></i>
          <p class="text-white">{{ notification.message }}</p>
          <button (click)="close(notification.id)" 
                  class="ml-auto text-white hover:text-gray-200 transition-colors duration-200">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe(
      notifications => this.notifications = notifications
    );
  }

  close(id: number) {
    this.notificationService.remove(id);
  }
}
