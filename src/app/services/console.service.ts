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

  async getConsolesByCompanyId(companyId: string): Promise<Consola[]> {
    try {
      console.log('🔍 Fetching consoles for company ID:', companyId);
      console.log('🌐 API URL will be:', `http://127.0.0.1:8000/consolas/empresa/${companyId}`);
      
      const empresaId = parseInt(companyId);
      if (isNaN(empresaId)) {
        throw new Error(`Invalid company ID: ${companyId}`);
      }
      
      // Usar el nuevo endpoint que no filtra por ruta
      const consolas = await this.apiService.getConsolasPorEmpresaGeneral(empresaId).toPromise();
      console.log('📦 API Response:', consolas);
      
      if (!consolas || !Array.isArray(consolas)) {
        console.warn('⚠️ No consoles data received or invalid format');
        return [];
      }
      
      // Mapear los datos del backend al formato esperado por el frontend
      const consolasWithEmpresaId = consolas.map(c => ({
        consola_id: c.consola_id,
        consola_nombre: c.nombre || c.consola_nombre, // El backend devuelve 'nombre', mapeamos a 'consola_nombre'
        empresa_id: empresaId,
        empresa_nombre: '' // Se puede agregar si es necesario
      }));
      
      console.log('✅ Mapped consoles:', consolasWithEmpresaId);
      return consolasWithEmpresaId;
      
    } catch (error) {
      console.error('❌ Error fetching consoles:', error);
      console.error('📍 Error details:', {
        companyId,
        error: error instanceof Error ? error.message : error
      });
      return [];
    }
  }

  async getAllConsoles(): Promise<Consola[]> {
    try {
      console.log('🔍 Fetching all consoles');
      
      // Usar el nuevo endpoint que no filtra por ruta
      const consolas = await this.apiService.getAllConsolasGeneral().toPromise();
      console.log('📦 API Response:', consolas);
      
      if (!consolas || !Array.isArray(consolas)) {
        console.warn('⚠️ No consoles data received or invalid format');
        return [];
      }
      
      // Mapear los datos del backend al formato esperado por el frontend
      const consolasMapped = consolas.map(c => ({
        consola_id: c.consola_id,
        consola_nombre: c.consola_nombre || c.nombre, // Usar consola_nombre si existe, sino nombre
        empresa_nombre: c.empresa_nombre || '',
        empresa_id: c.empresa_id
      }));
      
      console.log('✅ All consoles mapped:', consolasMapped);
      return consolasMapped;
      
    } catch (error) {
      console.error('❌ Error fetching all consoles:', error);
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
}
