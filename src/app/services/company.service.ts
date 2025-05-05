import { Injectable } from '@angular/core';
import { MockDataService, MockCompany } from './mock-data.service';

export type Company = MockCompany;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private mockDataService: MockDataService) {}

  async getCompanies(): Promise<Company[]> {
    return this.mockDataService.getCompanies();
  }

  async getCompany(id: string): Promise<Company | undefined> {
    return this.mockDataService.getCompany(id);
  }

  getCompanyColor(company: Company): string {
    const colors: { [key: string]: string } = {
      'nintendo': '#E60012',  // Nintendo Red
      'sony': '#003791',      // PlayStation Blue
      'sega': '#00A0E9',      // SEGA Blue
      'atari': '#E31D1A',     // Atari Red
      'microsoft': '#107C10'  // Xbox Green
    };
    return colors[company.id] || '#3B82F6'; // Default to blue if company not found
  }

  getCompanyInitial(company: Company): string {
    return company.name.charAt(0);
  }
}
