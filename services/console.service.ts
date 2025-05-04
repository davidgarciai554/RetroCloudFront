import { Injectable } from '@angular/core';

export interface Console {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  companyId: number;
  releaseYear: number;
  generation: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  private consoles: Console[] = [
    {
      id: 1,
      name: 'Nintendo Entertainment System',
      description: 'The 8-bit home video game console developed by Nintendo',
      imageUrl: 'assets/consoles/nes.png',
      companyId: 1,
      releaseYear: 1985,
      generation: 3
    },
    {
      id: 2,
      name: 'Super Nintendo Entertainment System',
      description: '16-bit home video game console developed by Nintendo',
      imageUrl: 'assets/consoles/snes.png',
      companyId: 1,
      releaseYear: 1990,
      generation: 4
    },
    {
      id: 3,
      name: 'PlayStation',
      description: 'Home video game console developed by Sony Computer Entertainment',
      imageUrl: 'assets/consoles/ps1.png',
      companyId: 2,
      releaseYear: 1994,
      generation: 5
    },
    {
      id: 4,
      name: 'Sega Genesis',
      description: '16-bit home video game console developed by Sega',
      imageUrl: 'assets/consoles/genesis.png',
      companyId: 3,
      releaseYear: 1988,
      generation: 4
    }
  ];

  constructor() {}

  getConsoles(): Console[] {
    return this.consoles;
  }

  getConsoleById(id: number): Console | undefined {
    return this.consoles.find(console => console.id === id);
  }

  getConsolesByCompanyId(companyId: number): Console[] {
    return this.consoles.filter(console => console.companyId === companyId);
  }
}
