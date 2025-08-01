import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Juego } from '../models/api.models';

export interface Game {
  id: string;
  name: string;
  title: string;  // Add this property
  releaseDate: string;
  consoleId: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private apiService: ApiService) {}

  async getGamesByConsoleId(consoleId: string): Promise<Game[]> {
    try {
      console.log('🎮 Fetching games for console ID:', consoleId);
      console.log('🌐 API URL will be:', `http://127.0.0.1:8000/juegos/all/consola/${consoleId}`);
      
      const consolaId = parseInt(consoleId);
      if (isNaN(consolaId)) {
        throw new Error(`Invalid console ID: ${consoleId}`);
      }
      
      // Usar el nuevo endpoint que no filtra por ruta
      const juegos = await this.apiService.getJuegosPorConsolaGeneral(consolaId).toPromise();
      console.log('📦 API Response:', juegos);
      
      if (!juegos || !Array.isArray(juegos)) {
        console.warn('⚠️ No games data received or invalid format');
        return [];
      }
      
      const mappedGames = juegos.map(j => ({
        id: j.id.toString(),
        name: j.nombre,
        title: j.nombre,  // Add this line - use the same value as name
        releaseDate: j.fecha_lanzamiento || '',
        consoleId: consoleId
      }));
      
      console.log('✅ Mapped games:', mappedGames);
      return mappedGames;
      
    } catch (error) {
      console.error('❌ Error fetching games:', error);
      console.error('📍 Error details:', {
        consoleId,
        error: error instanceof Error ? error.message : error
      });
      return [];
    }
  }

  async getAllGames(): Promise<Game[]> {
    try {
      console.log('🎮 Fetching all games');
      // Por ahora retornamos array vacío hasta implementar endpoint general de juegos
      // Podrías implementar un endpoint /juegos/all en el backend si lo necesitas
      return [];
    } catch (error) {
      console.error('❌ Error fetching all games:', error);
      return [];
    }
  }

  async uploadGame(gameData: any, files: File[]): Promise<void> {
    throw new Error('Method not implemented with real API');
  }

  async downloadGame(gameId: string): Promise<void> {
    throw new Error('Method not implemented with real API');
  }
}
