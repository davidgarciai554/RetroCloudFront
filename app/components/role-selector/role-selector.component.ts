import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { RoleService, UserRole } from '../../services/role.service';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.css'],
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class RoleSelectorComponent implements OnInit {
  @Input() roles: string[] = [];
  @Input() selectedRole: string = 'user';
  @Output() selectionChange = new EventEmitter<string>();

  isOpen = false;

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    // Initialize with current role from service
    const currentRole = this.roleService.getCurrentRole();
    this.selectedRole = currentRole;
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  selectRole(role: string): void {
    const newRole = role as UserRole;
    this.selectedRole = newRole;
    this.roleService.setRole(newRole);
    this.selectionChange.emit(newRole);
    console.log('Role selector - role selected:', newRole); // Debug log
    this.closeDropdown();
  }

  isSelected(role: string): boolean {
    return this.selectedRole === role;
  }

  getRoleIcon(role: string): string {
    return role === 'admin' ? 'fa-shield-alt' : 'fa-user';
  }

  getRoleClass(role: string): string {
    return role === 'admin' ? 'text-blue-500' : 'text-gray-400';
  }
}
