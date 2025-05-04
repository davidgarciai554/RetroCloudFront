import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Game, GameService } from '../../services/game.service';
import { Company, CompanyService } from '../../services/company.service';
import { Console, ConsoleService } from '../../services/console.service';

@Component({
  selector: 'app-search-manager',
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="relative">
        <input
          type="text"
          [formControl]="searchControl"
          placeholder="Search games, companies, consoles..."
          class="w-full px-4 py-2 pl-10 rounded-lg bg-gray-700/50 text-gray-100 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm backdrop-blur-sm"
        />
        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
      </div>
      
      <div class="mt-4 space-y-4">
        <!-- Companies -->
        <div *ngIf="filteredCompanies.length > 0">
          <h2 class="text-xl font-bold text-gray-200 mb-2">Companies</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let company of filteredCompanies" 
                 (click)="navigateToConsoles(company)"
                 class="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <h3 class="text-lg font-semibold text-gray-100">{{company.name}}</h3>
              <p class="text-gray-400 text-sm">{{company.description}}</p>
            </div>
          </div>
        </div>

        <!-- Consoles -->
        <div *ngIf="filteredConsoles.length > 0">
          <h2 class="text-xl font-bold text-gray-200 mb-2">Consoles</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let console of filteredConsoles"
                 (click)="navigateToGames(console)"
                 class="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <h3 class="text-lg font-semibold text-gray-100">{{console.name}}</h3>
              <p class="text-gray-400 text-sm">{{console.description}}</p>
            </div>
          </div>
        </div>

        <!-- Games -->
        <div *ngIf="filteredGames.length > 0">
          <h2 class="text-xl font-bold text-gray-200 mb-2">Games</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let game of filteredGames"
                 class="p-4 bg-gray-800 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-100">{{game.title}}</h3>
              <p class="text-gray-400 text-sm">{{game.description}}</p>
            </div>
          </div>
        </div>

        <!-- No results message -->
        <div *ngIf="searchControl.value && !filteredCompanies.length && !filteredConsoles.length && !filteredGames.length"
             class="text-center text-gray-400 py-8">
          No results found for "{{searchControl.value}}"
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SearchManagerComponent implements OnInit {
  searchControl = new FormControl('');
  filteredGames: Game[] = [];
  filteredCompanies: Company[] = [];
  filteredConsoles: Console[] = [];

  private allGames: Game[] = [];
  private allCompanies: Company[] = [];
  private allConsoles: Console[] = [];

  constructor(
    private router: Router,
    private gameService: GameService,
    private companyService: CompanyService,
    private consoleService: ConsoleService
  ) {}

  ngOnInit(): void {
    this.loadData();
    
    this.searchControl.valueChanges.subscribe(term => {
      this.onSearchChange(term || '');
    });
    
    this.onSearchChange('');
  }

  private loadData(): void {
    this.allCompanies = this.companyService.getCompanies();
    this.allConsoles = this.consoleService.getConsoles();
    this.allGames = this.gameService.getGames();
  }

  onSearchChange(term: string): void {
    const searchTerm = term.toLowerCase();

    this.filteredGames = this.allGames.filter(game =>
      game.title.toLowerCase().includes(searchTerm) ||
      game.description.toLowerCase().includes(searchTerm)
    );

    this.filteredConsoles = this.allConsoles.filter(consoleItem =>
      consoleItem.name.toLowerCase().includes(searchTerm) ||
      consoleItem.description.toLowerCase().includes(searchTerm)
    );

    this.filteredCompanies = this.allCompanies.filter(company =>
      company.name.toLowerCase().includes(searchTerm) ||
      company.description.toLowerCase().includes(searchTerm)
    );
  }

  navigateToConsoles(company: Company): void {
    this.router.navigate(['/company', company.id, 'consoles']);
  }

  navigateToGames(console: Console): void {
    this.router.navigate(['/console', console.id, 'games']);
  }
}
