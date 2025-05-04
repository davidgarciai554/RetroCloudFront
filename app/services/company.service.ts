import { Injectable } from '@angular/core';

export interface Company {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companies: Company[] = [
    {
      id: 1,
      name: 'Nintendo',
      description: 'Japanese multinational consumer electronics company',
      logoUrl: 'assets/logos/nintendo.png'
    },
    {
      id: 2,
      name: 'Sony',
      description: 'Japanese multinational conglomerate corporation',
      logoUrl: 'assets/logos/sony.png'
    },
    {
      id: 3,
      name: 'Sega',
      description: 'Japanese multinational video game developer',
      logoUrl: 'assets/logos/sega.png'
    }
  ];

  private companyColors: { [key: string]: string } = {
    'Nintendo': '#e60012',
    'Sony': '#003791',
    'Sega': '#0089CF',
    'default': '#6B7280'
  };

  constructor() {}

  getCompanies(): Company[] {
    return this.companies;
  }

  getCompanyById(id: number): Company | undefined {
    return this.companies.find(company => company.id === id);
  }

  getCompanyColor(companyName: string): string {
    return this.companyColors[companyName] || this.companyColors['default'];
  }
}
