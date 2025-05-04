import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game, GameService } from '../../services/game.service';
import { Console, ConsoleService } from '../../services/console.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  currentConsole?: Console;
  isLoading: boolean = true;

  constructor(
    private gameService: GameService,
    private consoleService: ConsoleService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const consoleId = Number(params['consoleId']);
      this.loadConsoleAndGames(consoleId);
    });
  }

  private loadConsoleAndGames(consoleId: number): void {
    this.isLoading = true;
    this.currentConsole = this.consoleService.getConsoleById(consoleId);
    
    if (!this.currentConsole) {
      this.router.navigate(['/']);
      return;
    }

    this.games = this.gameService.getGamesByConsoleId(consoleId);
    this.filteredGames = this.games;
    this.isLoading = false;
  }

  goBack(): void {
    if (this.currentConsole) {
      this.router.navigate(['/company', this.currentConsole.companyId, 'consoles']);
    } else {
      this.router.navigate(['/']);
    }
  }

  getGameBackground(game: Game): string {
    const company = this.companyService.getCompanyById(this.currentConsole?.companyId || 0);
    const color = this.companyService.getCompanyColor(company?.name || '');
    return `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`;
  }

  getBorderColor(): string {
    const company = this.companyService.getCompanyById(this.currentConsole?.companyId || 0);
    return this.companyService.getCompanyColor(company?.name || '');
  }
}
