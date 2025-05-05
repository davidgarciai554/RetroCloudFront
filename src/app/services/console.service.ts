import { Injectable } from '@angular/core';
import { MockDataService, MockConsole } from './mock-data.service';

export type Console = MockConsole;

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  constructor(private mockDataService: MockDataService) {}

  async getConsolesByCompanyId(companyId: string): Promise<Console[]> {
    return this.mockDataService.getConsolesByCompanyId(companyId);
  }

  async getConsole(id: string): Promise<Console | undefined> {
    return this.mockDataService.getConsole(id);
  }

  async getAllConsoles(): Promise<Console[]> {
    return this.mockDataService.getAllConsoles();
  }
}
