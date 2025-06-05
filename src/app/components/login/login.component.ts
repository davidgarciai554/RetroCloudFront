import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Token } from '../../models/api.models';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

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
    private apiService: ApiService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
      // Removed role field
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
    this.error = '';

    // Llama a la API real de login
    this.apiService.login({
      nombre: this.f['username'].value,
      contraseña: this.f['password'].value
    }).subscribe({
      next: (token: Token) => {
        this.loading = false;
        localStorage.setItem('authToken', token.access_token);
        this.authService.login(token.access_token);
        this.notificationService.show('¡Login exitoso!', 'success');
        this.router.navigate([this.returnUrl]);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 400) {
          this.error = 'Usuario o contraseña incorrectos';
        } else {
          this.error = 'Ocurrió un error durante el inicio de sesión. Intenta de nuevo.';
        }
        this.notificationService.show(this.error, 'error');
      }
    });
  }
}
