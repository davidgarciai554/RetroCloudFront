import { Injectable } from '@angular/core';

export interface Game {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  consoleId: number;
  releaseYear: number;
  genre: string;
  publisher: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games: Game[] = [
    {
      id: 1,
      title: 'Super Mario Bros.',
      description: 'Classic platformer game featuring Mario and Luigi',
      imageUrl: 'assets/games/super-mario-bros.png',
      consoleId: 1,
      releaseYear: 1985,
      genre: 'Platformer',
      publisher: 'Nintendo'
    },
    {
      id: 2,
      title: 'The Legend of Zelda',
      description: 'Action-adventure game in the land of Hyrule',
      imageUrl: 'assets/games/legend-of-zelda.png',
      consoleId: 1,
      releaseYear: 1986,
      genre: 'Action-Adventure',
      publisher: 'Nintendo'
    },
    {
      id: 3,
      title: 'Final Fantasy VII',
      description: 'Epic role-playing game following Cloud Strife',
      imageUrl: 'assets/games/ff7.png',
      consoleId: 3,
      releaseYear: 1997,
      genre: 'RPG',
      publisher: 'Square'
    },
    {
      id: 4,
      title: 'Sonic the Hedgehog',
      description: 'Fast-paced platformer featuring Sonic',
      imageUrl: 'assets/games/sonic.png',
      consoleId: 4,
      releaseYear: 1991,
      genre: 'Platformer',
      publisher: 'Sega'
    }
  ];

  constructor() {}

  getGames(): Game[] {
    return this.games;
  }

  getGameById(id: number): Game | undefined {
    return this.games.find(game => game.id === id);
  }

  getGamesByConsoleId(consoleId: number): Game[] {
    return this.games.filter(game => game.consoleId === consoleId);
  }
}
