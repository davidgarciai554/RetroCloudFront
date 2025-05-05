import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '/companies';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    // Redirect if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/companies']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['user', Validators.required] // Add role field with default value
    });
  }

  ngOnInit() {
    // Get return url from route parameters or default to '/companies'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/companies';
  }

  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const success = this.authService.login(
      this.f['username'].value,
      this.f['password'].value,
      this.f['role'].value // Pass selected role to auth service
    );

    if (success) {
      this.notificationService.show('Login successful!', 'success');
      this.router.navigate([this.returnUrl]);
    } else {
      this.error = 'Invalid username or password';
      this.notificationService.show('Invalid username or password', 'error');
      this.loading = false;
    }
  }
}
