import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConsoleService } from '../../services/console.service';
import { CompanyService, Company } from '../../services/company.service';
import { SearchStateService } from '../../services/search-state.service';
import { Consola } from '../../models/api.models';

@Component({
  selector: 'app-console-list',
  templateUrl: './console-list.component.html'
})
export class ConsoleListComponent implements OnInit {
  consoles: Consola[] = [];
  currentCompany?: Company;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private consoleService: ConsoleService,
    private companyService: CompanyService,
    private searchStateService: SearchStateService
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    try {
      const companyId = this.route.snapshot.paramMap.get('companyId');
      console.log('🔍 ConsoleListComponent - Company ID from route:', companyId);
      
      if (!companyId) {
        console.warn('⚠️ No company ID found in route, redirecting to companies');
        this.router.navigate(['/companies']);
        return;
      }

      // Load company info
      console.log('📋 Loading company info for ID:', companyId);
      this.currentCompany = await this.companyService.getCompany(companyId);
      console.log('🏢 Current company loaded:', this.currentCompany);
      
      // Load consoles
      console.log('🎮 Loading consoles for company ID:', companyId);
      this.consoles = await this.consoleService.getConsolesByCompanyId(companyId);
      console.log('📦 Consoles loaded:', this.consoles);

      // Subscribe to search term changes
      this.searchStateService.currentSearchTerm.subscribe(async term => {
        if (term) {
          const results = await this.searchStateService.searchAll(term);
          this.consoles = results.consoles.filter(console => 
            console.empresa_id === parseInt(companyId)
          );
        } else {
          this.consoles = await this.consoleService.getConsolesByCompanyId(companyId);
        }
      });

    } catch (error) {
      console.error('Error loading consoles:', error);
    } finally {
      this.isLoading = false;
    }
  }

  viewGames(console: Consola) {
    this.router.navigate(['/console', console.consola_id, 'games']);
  }

  getCompanyColor(): string {
    return this.currentCompany ? 
      this.companyService.getCompanyColor(this.currentCompany) : 
      '#3B82F6';
  }

  goBack() {
    this.location.back();
  }
}
