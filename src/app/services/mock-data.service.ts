import { Injectable } from '@angular/core';

export interface MockCompany {
  id: string;
  name: string;
}

export interface MockConsole {
  id: string;
  name: string;
  companyId: string;
}

export interface MockGame {
  id: string;
  title: string;
  consoleId: string;
  companyId: string;
  fileUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private companies: MockCompany[] = [
    { id: 'nintendo', name: 'Nintendo' },
    { id: 'sony', name: 'Sony' },
    { id: 'sega', name: 'SEGA' },
    { id: 'atari', name: 'Atari' },
    { id: 'microsoft', name: 'Microsoft' }
  ];

  private consoles: MockConsole[] = [
    // Nintendo Consoles
    { id: 'nes', name: 'NES', companyId: 'nintendo' },
    { id: 'snes', name: 'SNES', companyId: 'nintendo' },
    { id: 'n64', name: 'Nintendo 64', companyId: 'nintendo' },
    { id: 'gamecube', name: 'GameCube', companyId: 'nintendo' },
    { id: 'wii', name: 'Wii', companyId: 'nintendo' },

    // Sony Consoles
    { id: 'ps1', name: 'PlayStation', companyId: 'sony' },
    { id: 'ps2', name: 'PlayStation 2', companyId: 'sony' },
    { id: 'psp', name: 'PSP', companyId: 'sony' },
    { id: 'ps3', name: 'PlayStation 3', companyId: 'sony' },

    // SEGA Consoles
    { id: 'genesis', name: 'Genesis', companyId: 'sega' },
    { id: 'saturn', name: 'Saturn', companyId: 'sega' },
    { id: 'dreamcast', name: 'Dreamcast', companyId: 'sega' },

    // Atari Consoles
    { id: 'atari2600', name: 'Atari 2600', companyId: 'atari' },
    { id: 'atari5200', name: 'Atari 5200', companyId: 'atari' },
    { id: 'atari7800', name: 'Atari 7800', companyId: 'atari' },

    // Microsoft Consoles
    { id: 'xbox', name: 'Xbox', companyId: 'microsoft' },
    { id: 'xbox360', name: 'Xbox 360', companyId: 'microsoft' }
  ];

  private games: MockGame[] = [
    // Nintendo Games
    { id: 'mario1', title: 'Super Mario Bros.', consoleId: 'nes', companyId: 'nintendo', fileUrl: '/games/mario.rom' },
    { id: 'zelda1', title: 'The Legend of Zelda', consoleId: 'nes', companyId: 'nintendo', fileUrl: '/games/zelda.rom' },
    { id: 'mario64', title: 'Super Mario 64', consoleId: 'n64', companyId: 'nintendo', fileUrl: '/games/mario64.rom' },
    { id: 'mariokart', title: 'Mario Kart 64', consoleId: 'n64', companyId: 'nintendo', fileUrl: '/games/mariokart.rom' },
    { id: 'smw', title: 'Super Mario World', consoleId: 'snes', companyId: 'nintendo', fileUrl: '/games/smw.rom' },

    // Sony Games
    { id: 'crash1', title: 'Crash Bandicoot', consoleId: 'ps1', companyId: 'sony', fileUrl: '/games/crash.iso' },
    { id: 'spyro1', title: 'Spyro the Dragon', consoleId: 'ps1', companyId: 'sony', fileUrl: '/games/spyro.iso' },
    { id: 'ff7', title: 'Final Fantasy VII', consoleId: 'ps1', companyId: 'sony', fileUrl: '/games/ff7.iso' },
    { id: 'mgs2', title: 'Metal Gear Solid 2', consoleId: 'ps2', companyId: 'sony', fileUrl: '/games/mgs2.iso' },

    // SEGA Games
    { id: 'sonic1', title: 'Sonic the Hedgehog', consoleId: 'genesis', companyId: 'sega', fileUrl: '/games/sonic.md' },
    { id: 'sonic2', title: 'Sonic the Hedgehog 2', consoleId: 'genesis', companyId: 'sega', fileUrl: '/games/sonic2.md' },
    { id: 'nights', title: 'NiGHTS into Dreams', consoleId: 'saturn', companyId: 'sega', fileUrl: '/games/nights.iso' },
    { id: 'jet', title: 'Jet Set Radio', consoleId: 'dreamcast', companyId: 'sega', fileUrl: '/games/jsr.gdi' },

    // Atari Games
    { id: 'pacman', title: 'Pac-Man', consoleId: 'atari2600', companyId: 'atari', fileUrl: '/games/pacman.a26' },
    { id: 'pitfall', title: 'Pitfall!', consoleId: 'atari2600', companyId: 'atari', fileUrl: '/games/pitfall.a26' },

    // Microsoft Games
    { id: 'halo1', title: 'Halo: Combat Evolved', consoleId: 'xbox', companyId: 'microsoft', fileUrl: '/games/halo.iso' },
    { id: 'halo2', title: 'Halo 2', consoleId: 'xbox', companyId: 'microsoft', fileUrl: '/games/halo2.iso' }
  ];

  getCompanies(): Promise<MockCompany[]> {
    return Promise.resolve([...this.companies]);
  }

  getCompany(id: string): Promise<MockCompany | undefined> {
    return Promise.resolve(this.companies.find(company => company.id === id));
  }

  getAllConsoles(): Promise<MockConsole[]> {
    return Promise.resolve([...this.consoles]);
  }

  getConsole(id: string): Promise<MockConsole | undefined> {
    return Promise.resolve(this.consoles.find(console => console.id === id));
  }

  getConsolesByCompanyId(companyId: string): Promise<MockConsole[]> {
    return Promise.resolve(this.consoles.filter(console => console.companyId === companyId));
  }

  getGames(): Promise<MockGame[]> {
    return Promise.resolve([...this.games]);
  }

  getGamesByConsoleId(consoleId: string): Promise<MockGame[]> {
    return Promise.resolve(this.games.filter(game => game.consoleId === consoleId));
  }

  searchAll(term: string): Promise<{
    companies: MockCompany[];
    consoles: MockConsole[];
    games: MockGame[];
  }> {
    const lowercaseTerm = term.toLowerCase();
    return Promise.resolve({
      companies: this.companies.filter(c => 
        c.name.toLowerCase().includes(lowercaseTerm)
      ),
      consoles: this.consoles.filter(c => 
        c.name.toLowerCase().includes(lowercaseTerm)
      ),
      games: this.games.filter(g => 
        g.title.toLowerCase().includes(lowercaseTerm)
      )
    });
  }

  uploadGame(gameData: any, files: File[]): Promise<void> {
    // Mock implementation - just simulate a delay
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  downloadGame(gameId: string): Promise<void> {
    // Mock implementation - just simulate a delay
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
}
