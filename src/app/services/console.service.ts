import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Consola } from '../models/api.models';

export interface Console {
  id: string;
  name: string;
  companyId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  constructor(private apiService: ApiService) {}

  async getConsolesByCompanyId(companyId: string): Promise<Console[]> {
    try {
      console.log('🔍 Fetching consoles for company ID:', companyId);
      console.log('🌐 API URL will be:', `http://127.0.0.1:8000/consolas/${companyId}`);
      
      const empresaId = parseInt(companyId);
      if (isNaN(empresaId)) {
        throw new Error(`Invalid company ID: ${companyId}`);
      }
      
      const consolas = await this.apiService.getConsolasPorEmpresa(empresaId).toPromise();
      console.log('📦 API Response:', consolas);
      
      if (!consolas || !Array.isArray(consolas)) {
        console.warn('⚠️ No consoles data received or invalid format');
        return [];
      }
      
      const mappedConsoles = consolas.map(c => ({
        id: c.consola_id.toString(),
        name: c.nombre,
        companyId: companyId
      }));
      
      console.log('✅ Mapped consoles:', mappedConsoles);
      return mappedConsoles;
      
    } catch (error) {
      console.error('❌ Error fetching consoles:', error);
      console.error('📍 Error details:', {
        companyId,
        error: error instanceof Error ? error.message : error
      });
      return [];
    }
  }

  async getConsole(id: string): Promise<Console | undefined> {
    try {
      // Para obtener una consola específica, necesitamos obtener todas las consolas
      // de todas las empresas y buscar la que coincida con el ID
      // Esto es una limitación de la API actual
      console.log('🔍 Searching for console with ID:', id);
      
      // Aquí necesitarías implementar una lógica para obtener la consola específica
      // Por ahora, retornamos un objeto básico basado en el ID
      return {
        id: id,
        name: `Console ${id}`, // Placeholder - idealmente esto vendría de la API
        companyId: '1' // Placeholder - idealmente esto vendría de la API
      };
    } catch (error) {
      console.error('❌ Error fetching console:', error);
      return undefined;
    }
  }

  async getAllConsoles(): Promise<Console[]> {
    throw new Error('Method not implemented with real API');
  }
}
