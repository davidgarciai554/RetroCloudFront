import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CompanyService, Company } from './company.service';
import { ConsoleService, Console } from './console.service';
import { GameService, Game } from './game.service';
import { MockDataService } from './mock-data.service';

export interface SearchResults {
  companies: Company[];
  consoles: Console[];
  games: Game[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  private searchTermSubject = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTermSubject.asObservable();

  constructor(
    private mockDataService: MockDataService,
    private companyService: CompanyService,
    private consoleService: ConsoleService,
    private gameService: GameService
  ) {}

  updateSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  async searchAll(term: string): Promise<SearchResults> {
    if (!term) {
      return {
        companies: await this.companyService.getCompanies(),
        consoles: await this.consoleService.getAllConsoles(),
        games: await this.gameService.getAllGames()
      };
    }

    return this.mockDataService.searchAll(term);
  }
}
