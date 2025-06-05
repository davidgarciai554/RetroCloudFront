import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConsoleService, Console } from '../../services/console.service';
import { CompanyService, Company } from '../../services/company.service';
import { SearchStateService } from '../../services/search-state.service';

@Component({
  selector: 'app-console-list',
  templateUrl: './console-list.component.html'
})
export class ConsoleListComponent implements OnInit {
  consoles: Console[] = [];
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
    try {
      this.isLoading = true;
      const companyId = this.route.snapshot.params['companyId'];
      console.log('🎮 Console component initialized with company ID:', companyId);
      
      // Get company details

      console.log('✅ Company loaded:', this.currentCompany);

      // Get consoles for this company
      console.log('🎮 Fetching consoles...');
      this.consoles = await this.consoleService.getConsolesByCompanyId(companyId);
      console.log('✅ Consoles loaded:', this.consoles);

      // Subscribe to search term changes
      this.searchStateService.currentSearchTerm.subscribe(async term => {
        if (term) {
          const results = await this.searchStateService.searchAll(term);
          this.consoles = results.consoles.filter(console => 
            console.companyId === companyId
          );
        } else {
          this.consoles = await this.consoleService.getConsolesByCompanyId(companyId);
        }
      });

    } catch (err) {
      console.error('❌ Failed to load consoles:', err);
    } finally {
      this.isLoading = false;
    }
  }

  viewGames(console: Console) {
    this.router.navigate(['/console', console.id, 'games']);
  }

  getCompanyColor(): string {
    return this.currentCompany ? 
      this.companyService.getCompanyColor(this.currentCompany) : 
      '#3B82F6';
  }

  goBack(): void {
    this.location.back();
  }
}
