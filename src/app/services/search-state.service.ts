import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CompanyService, Company } from './company.service';
import { ConsoleService, Console } from './console.service';
import { GameService, Game } from './game.service';
import { Consola } from '../models/api.models';
import { SearchService } from './search.service';

export interface SearchResults {
  companies: Company[];
  consoles: Consola[];
  games: Game[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  private searchTermSubject = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTermSubject.asObservable();

  constructor(
    private companyService: CompanyService,
    private consoleService: ConsoleService,
    private gameService: GameService,
    private searchService: SearchService
  ) {}

  updateSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  // Actualizar el método searchAll:
  async searchAll(query: string): Promise<SearchResults> {
    try {
      console.log('🔍 Searching all with query:', query);
      
      // Usar el nuevo servicio de búsqueda general
      const results = await this.searchService.searchAll(query, 'all');
      
      return {
        companies: results.companies.map(c => ({
          id: c.id.toString(),
          name: c.name
        })),
        consoles: results.consoles.map(c => {
          const company = results.companies.find(comp => comp.id === c.company_id);
          return {
            consola_id: c.id,
            consola_nombre: c.name,
            empresa_nombre: company?.name || '',
            empresa_id: c.company_id
          };
        }),
        games: results.games.map(g => ({
          id: g.id.toString(),
          name: g.title,
          title: g.title,
          releaseDate: g.release_date || '',
          consoleId: g.console_id.toString()
        }))
      };
    } catch (error) {
      console.error('❌ Error in searchAll:', error);
      return { companies: [], consoles: [], games: [] };
    }
  }
}
