import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Console, ConsoleService } from '../../services/console.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-upload-game',
  templateUrl: './upload-game.component.html',
  styleUrls: ['./upload-game.component.css']
})
export class UploadGameComponent implements OnInit {
  uploadForm: FormGroup;
  consoles: Console[] = [];
  isLoading = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private consoleService: ConsoleService,
    private gameService: GameService,
    private router: Router
  ) {
    this.uploadForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      consoleId: ['', Validators.required],
      releaseYear: ['', [Validators.required, Validators.min(1970), Validators.max(new Date().getFullYear())]],
      genre: ['', Validators.required],
      publisher: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadConsoles();
  }

  private loadConsoles(): void {
    this.consoles = this.consoleService.getConsoles();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid) {
      this.isLoading = true;
      
      // Here you would typically make an API call to upload the game
      // For now, we'll just simulate it with a timeout
      setTimeout(() => {
        console.log('Form submitted:', this.uploadForm.value);
        console.log('Selected file:', this.selectedFile);
        this.isLoading = false;
        this.router.navigate(['/console', this.uploadForm.value.consoleId, 'games']);
      }, 1500);
    } else {
      Object.keys(this.uploadForm.controls).forEach(key => {
        const control = this.uploadForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getControlError(controlName: string): string {
    const control = this.uploadForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['min']) {
        return `Minimum value is ${control.errors['min'].min}`;
      }
      if (control.errors['max']) {
        return `Maximum value is ${control.errors['max'].max}`;
      }
    }
    return '';
  }
}
