import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface SearchResults {
  companies: Array<{id: number, name: string}>;
  consoles: Array<{id: number, name: string, company_id: number}>;
  games: Array<{id: number, title: string, console_id: number, release_date?: string}>;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private apiService: ApiService) {}

  async searchAll(query: string, type: string = 'all'): Promise<SearchResults> {
    try {
      console.log('🔍 Searching for:', query, 'Type:', type);
      
      const results = await this.apiService.searchGeneral(query, type).toPromise();
      console.log('📦 Search results:', results);
      
      return results || { companies: [], consoles: [], games: [] };
      
    } catch (error) {
      console.error('❌ Error searching:', error);
      return { companies: [], consoles: [], games: [] };
    }
  }
}