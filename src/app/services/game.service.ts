import { Injectable } from '@angular/core';
import { MockDataService, MockGame } from './mock-data.service';

export type Game = MockGame;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private mockDataService: MockDataService) {}

  async getGamesByConsoleId(consoleId: string): Promise<Game[]> {
    return this.mockDataService.getGamesByConsoleId(consoleId);
  }

  async getAllGames(): Promise<Game[]> {
    return this.mockDataService.getGames();
  }

  async uploadGame(gameData: any, files: File[]): Promise<void> {
    return this.mockDataService.uploadGame(gameData, files);
  }

  async downloadGame(gameId: string): Promise<void> {
    return this.mockDataService.downloadGame(gameId);
  }
}
