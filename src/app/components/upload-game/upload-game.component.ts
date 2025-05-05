import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsoleService } from '../../services/console.service';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-upload-game',
  templateUrl: './upload-game.component.html',
  styleUrls: ['./upload-game.component.css']
})
export class UploadGameComponent implements OnInit {
  uploadForm: FormGroup;
  consoles: any[] = [];
  selectedFiles: File[] = [];
  isLoading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private consoleService: ConsoleService,
    private gameService: GameService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.uploadForm = this.formBuilder.group({
      consoleId: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }
    this.loadConsoles();
  }

  async loadConsoles() {
    try {
      // Get all consoles across all companies
      this.consoles = await this.consoleService.getAllConsoles();
      // Sort consoles by company name and console name
      this.consoles.sort((a, b) => {
        if (a.companyName === b.companyName) {
          return a.name.localeCompare(b.name);
        }
        return a.companyName.localeCompare(b.companyName);
      });
    } catch (error) {
      console.error('Error loading consoles:', error);
      this.error = 'Failed to load consoles. Please try again.';
    }
  }

  onFilesDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFiles = [files[0]]; // Only take the first file
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = [input.files[0]]; // Only take the first file
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  removeFile(index: number) {
    this.selectedFiles = [];
  }

  async onSubmit() {
    if (this.uploadForm.invalid || this.selectedFiles.length === 0) {
      return;
    }

    this.isLoading = true;
    this.error = '';

    try {
      const consoleId = this.uploadForm.get('consoleId')?.value;
      const selectedConsole = this.consoles.find(c => c.id === consoleId);
      
      if (!selectedConsole) {
        throw new Error('Selected console not found');
      }

      // Create game data with file name as title
      const gameData = {
        consoleId: consoleId,
        title: this.selectedFiles[0].name.replace(/\.[^/.]+$/, ""), // Remove file extension
        companyId: selectedConsole.companyId
      };

      await this.gameService.uploadGame(gameData, this.selectedFiles);
      this.notificationService.show('Game uploaded successfully!', 'success');
      this.router.navigate(['/console', consoleId, 'games']);
    } catch (error) {
      console.error('Error uploading game:', error);
      this.error = 'Failed to upload game. Please try again.';
      this.notificationService.show('Failed to upload game. Please try again.', 'error');
    } finally {
      this.isLoading = false;
    }
  }
}
