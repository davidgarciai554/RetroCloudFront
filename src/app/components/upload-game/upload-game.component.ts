import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsoleService } from '../../services/console.service';
import { GameService, Game } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Consola } from '../../models/api.models';

@Component({
  selector: 'app-upload-game',
  templateUrl: './upload-game.component.html',
  styleUrls: ['./upload-game.component.css']
})
export class UploadGameComponent implements OnInit {
  uploadForm: FormGroup;
  consoles: Consola[] = [];
  games: Game[] = [];
  selectedFiles: File[] = [];
  isLoading = false;
  error = '';
  currentStep = 1;
  selectedConsole: Consola | null = null;
  selectedGame: Game | null = null;
  
  // Filtering properties
  consoleSearchTerm = '';
  gameSearchTerm = '';
  filteredConsoles: Consola[] = [];
  filteredGames: Game[] = [];
  showConsoleDropdown = false;
  showGameDropdown = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private consoleService: ConsoleService,
    private gameService: GameService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    // Simplificar el formulario - solo para validación final
    this.uploadForm = this.fb.group({
      // Remover consoleId y gameId ya que usamos ngModel
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
      this.consoles = await this.consoleService.getAllConsoles();
      console.log('Consoles loaded:', this.consoles.map(c => ({ id: c.consola_id, name: c.consola_nombre || c.nombre })));
      this.consoles.sort((a, b) => {
        const nameA = a.consola_nombre || a.nombre || '';
        const nameB = b.consola_nombre || b.nombre || '';
        return nameA.localeCompare(nameB);
      });
      this.filteredConsoles = [...this.consoles];
    } catch (error) {
      console.error('Error loading consoles:', error);
      this.error = 'Failed to load consoles. Please try again.';
    }
  }

  async loadGames(consoleId: string) {
    try {
      this.isLoading = true;
      this.games = await this.gameService.getGamesByConsoleId(this.selectedConsole?.consola_id.toString() || '');
      console.log('Loaded games for console:', this.selectedConsole?.consola_nombre, this.games);
      this.filteredGames = [...this.games];
      this.gameSearchTerm = '';
    } catch (error) {
      console.error('Error loading games:', error);
      this.error = 'Failed to load games. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  // Filtering methods
  filterConsoles() {
    if (!this.consoleSearchTerm.trim()) {
      this.filteredConsoles = [...this.consoles];
    } else {
      const searchTerm = this.consoleSearchTerm.toLowerCase();
      this.filteredConsoles = this.consoles.filter(console => {
        const consoleName = console.consola_nombre || console.nombre || '';
        return consoleName.toLowerCase().includes(searchTerm);
      });
    }
    this.showConsoleDropdown = true;
  }

  filterGames() {
    if (!this.gameSearchTerm.trim()) {
      this.filteredGames = [...this.games];
    } else {
      const searchTerm = this.gameSearchTerm.toLowerCase();
      this.filteredGames = this.games.filter(game => 
        game.name.toLowerCase().includes(searchTerm)
      );
    }
    this.showGameDropdown = true;
  }

  // Selection methods
  // Actualizar el método selectConsole
  selectConsole(console: Consola) {
    this.selectedConsole = console;
    this.consoleSearchTerm = console.consola_nombre || console.nombre || '';
    this.showConsoleDropdown = false;
    // Remover la línea del setValue ya que no usamos formControlName
    this.loadGames(console.consola_id.toString());
    this.currentStep = 2;
  }

  // Actualizar el método selectGame
  selectGame(game: Game) {
    this.selectedGame = game;
    this.gameSearchTerm = game.name;
    this.showGameDropdown = false;
    // Remover la línea del setValue ya que no usamos formControlName
    this.currentStep = 3;
  }

  // Actualizar el método goBack
  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
      if (this.currentStep === 1) {
        this.selectedConsole = null;
        this.games = [];
        this.consoleSearchTerm = '';
        this.filteredConsoles = [...this.consoles];
        this.showConsoleDropdown = false;
      }
      if (this.currentStep === 2) {
        this.selectedGame = null;
        this.selectedFiles = [];
        this.gameSearchTerm = '';
        this.filteredGames = [...this.games];
        this.showGameDropdown = false;
      }
    }
  }

  // Actualizar el método onSubmit para validar sin formulario reactivo
  async onSubmit(): Promise<void> {
    if (!this.selectedConsole || !this.selectedGame || this.selectedFiles.length === 0) {
      this.notificationService.show('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      this.isLoading = true;
      
      const gameId = this.uploadForm.get('gameId')?.value;
      
      console.log('Uploading files for game:', this.selectedGame.name);
      console.log('Game ID:', gameId);
      console.log('Files to upload:', this.selectedFiles);
      
      // Here you would call the game service to upload files for the existing game
      // await this.gameService.uploadGameFiles(gameId, this.selectedFiles);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.notificationService.show(`Files uploaded successfully for ${this.selectedGame?.name || 'game'}!`, 'success');
      
      // Reset form and go back to step 1
      this.resetForm();
      
    } catch (error) {
      console.error('Error uploading files:', error);
      this.notificationService.show('Failed to upload files. Please try again.', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  resetForm(): void {
    this.uploadForm.reset();
    this.selectedFiles = [];
    this.currentStep = 1;
    this.selectedConsole = null;
    this.selectedGame = null;
    this.games = [];
  }

  // Add the missing HostListener for document clicks
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.console-search-container')) {
      this.showConsoleDropdown = false;
    }
    if (!target.closest('.game-search-container')) {
      this.showGameDropdown = false;
    }
  }

  // File handling methods
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onFilesDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  private handleFiles(files: File[]) {
    // Filter for common game file extensions
    const validExtensions = ['.zip', '.rar', '.7z', '.rom', '.iso', '.bin', '.cue', '.img'];
    const validFiles = files.filter(file => {
      const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      return validExtensions.includes(extension);
    });

    if (validFiles.length !== files.length) {
      this.notificationService.show('Some files were skipped. Only game files are allowed.', 'info');
    }

    this.selectedFiles.push(...validFiles);
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }
}
