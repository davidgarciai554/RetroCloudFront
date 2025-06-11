import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Empresa } from '../models/api.models';
import { COMPANY_COLORS, DEFAULT_COLOR } from '../shared/company-colors';

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
    // Usar el archivo de colores existente y buscar por nombre de empresa
    const companyName = company.name.toLowerCase();
    
    // Mapeo directo por nombre de empresa
    let color = COMPANY_COLORS[company.name];
    
    // Si no encuentra por nombre exacto, buscar por palabras clave en el nombre
    if (!color) {
      if (companyName.includes('nintendo') || companyName.includes('nes') || companyName.includes('snes') || companyName.includes('game boy') || companyName.includes('gamecube') || companyName.includes('wii')) {
        color = COMPANY_COLORS['Nintendo'];
      } else if (companyName.includes('playstation') || companyName.includes('psp') || companyName.includes('ps vita') || companyName.includes('sony')) {
        color = COMPANY_COLORS['Sony'];
      } else if (companyName.includes('xbox') || companyName.includes('microsoft')) {
        color = COMPANY_COLORS['Microsoft'];
      } else if (companyName.includes('sega') || companyName.includes('dreamcast') || companyName.includes('saturn') || companyName.includes('genesis') || companyName.includes('master system') || companyName.includes('game gear')) {
        color = COMPANY_COLORS['Sega'];
      } else if (companyName.includes('atari')) {
        color = COMPANY_COLORS['Atari'];
      } else if (companyName.includes('apple') || companyName.includes('ios') || companyName.includes('macos')) {
        color = COMPANY_COLORS['Apple'];
      } else if (companyName.includes('android') || companyName.includes('google')) {
        color = COMPANY_COLORS['Google'];
      } else if (companyName.includes('linux')) {
        color = COMPANY_COLORS['Linux'];
      } else if (companyName.includes('pc') || companyName.includes('windows')) {
        color = COMPANY_COLORS['PC'];
      } else if (companyName.includes('web')) {
        color = COMPANY_COLORS['Web'];
      } else if (companyName.includes('commodore') || companyName.includes('amiga')) {
        color = COMPANY_COLORS['Commodore'];
      } else if (companyName.includes('3do')) {
        color = COMPANY_COLORS['The 3DO Company'];
      }
    }
    
    return color || DEFAULT_COLOR;
  }

  getCompanyInitial(company: Company): string {
    return company.name.charAt(0);
  }
}
