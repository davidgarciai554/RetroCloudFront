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

    // Get mock data and convert to proper types
    const mockResults = await this.mockDataService.searchAll(term);
    
    return {
      companies: mockResults.companies.map(c => ({
        id: c.id,
        name: c.name
      })),
      consoles: mockResults.consoles.map(c => ({
        id: c.id,
        name: c.name,
        companyId: c.companyId
      })),
      games: mockResults.games.map(g => ({
        id: g.id,
        name: g.title,  // Map title to name
        title: g.title,
        releaseDate: '', // MockGame doesn't have releaseDate, so use empty string
        consoleId: g.consoleId
      }))
    };
  }
}
