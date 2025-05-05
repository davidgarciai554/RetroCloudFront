import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService, Company } from '../../services/company.service';
import { SearchStateService } from '../../services/search-state.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  filteredCompanies: Company[] = [];
  isLoading = true;
  error = '';

  constructor(
    private companyService: CompanyService,
    private searchStateService: SearchStateService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      this.companies = await this.companyService.getCompanies();
      this.filteredCompanies = this.companies;
      
      // Subscribe to search term changes
      this.searchStateService.currentSearchTerm.subscribe(async term => {
        if (term) {
          const results = await this.searchStateService.searchAll(term);
          this.filteredCompanies = results.companies;
        } else {
          this.filteredCompanies = this.companies;
        }
      });

    } catch (err) {
      this.error = 'Failed to load companies';
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  async onSearch(term: string) {
    this.searchStateService.updateSearchTerm(term);
  }

  viewConsoles(company: Company) {
    this.router.navigate(['/company', company.id, 'consoles']);
  }

  getCompanyColor(company: Company): string {
    return this.companyService.getCompanyColor(company);
  }

  getCompanyInitial(company: Company): string {
    return this.companyService.getCompanyInitial(company);
  }
}
