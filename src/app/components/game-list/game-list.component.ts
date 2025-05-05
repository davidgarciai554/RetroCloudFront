import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GameService, Game } from '../../services/game.service';
import { ConsoleService, Console } from '../../services/console.service';
import { CompanyService } from '../../services/company.service';
import { SearchStateService } from '../../services/search-state.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html'
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  currentConsole?: Console;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private gameService: GameService,
    private consoleService: ConsoleService,
    private companyService: CompanyService,
    private searchStateService: SearchStateService
  ) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      const consoleId = this.route.snapshot.params['consoleId'];
      
      // Get console details
      this.currentConsole = await this.consoleService.getConsole(consoleId);
      if (!this.currentConsole) {
        throw new Error('Console not found');
      }

      // Get games for this console
      this.games = await this.gameService.getGamesByConsoleId(consoleId);

      // Subscribe to search term changes
      this.searchStateService.currentSearchTerm.subscribe(async term => {
        if (term) {
          const results = await this.searchStateService.searchAll(term);
          this.games = results.games.filter(game => 
            game.consoleId === consoleId
          );
        } else {
          this.games = await this.gameService.getGamesByConsoleId(consoleId);
        }
      });

    } catch (err) {
      console.error('Failed to load games:', err);
    } finally {
      this.isLoading = false;
    }
  }

  async downloadGame(game: Game) {
    try {
      await this.gameService.downloadGame(game.id);
      // Handle successful download (e.g., show notification)
    } catch (err) {
      console.error('Failed to download game:', err);
      // Handle error (e.g., show error message)
    }
  }

  getCompanyColor(): string {
    if (!this.currentConsole) return '#3B82F6';
    const company = { id: this.currentConsole.companyId, name: '' };
    return this.companyService.getCompanyColor(company);
  }

  goBack(): void {
    this.location.back();
  }
}
