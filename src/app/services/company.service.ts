import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Empresa } from '../models/api.models';

export interface Company {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private apiService: ApiService) {}

  async getCompanies(): Promise<Company[]> {
    const empresas = await this.apiService.getEmpresas().toPromise() || [];
    return empresas.map(e => ({
      id: e.empresa_id,
      name: e.empresa_nombre
    }));
  }

  async getCompany(id: string): Promise<Company | undefined> {
    const companies = await this.getCompanies();
    return companies.find(company => company.id === id);
  }

  getCompanyColor(company: Company): string {
    const colors: { [key: string]: string } = {
      'nintendo': '#E60012',
      'sony': '#003791',
      'sega': '#00A0E9',
      'atari': '#E31D1A',
      'microsoft': '#107C10'
    };
    return colors[company.id] || '#3B82F6';
  }

  getCompanyInitial(company: Company): string {
    return company.name.charAt(0);
  }
}
