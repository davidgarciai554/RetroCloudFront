import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company, CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  filteredCompanies: Company[] = [];
  isLoading: boolean = true;

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  private loadCompanies(): void {
    this.isLoading = true;
    try {
      this.companies = this.companyService.getCompanies();
      this.filteredCompanies = this.companies;
    } catch (error) {
      console.error('Error loading companies:', error);
    } finally {
      this.isLoading = false;
    }
  }

  viewConsoles(company: Company): void {
    this.router.navigate(['/company', company.id, 'consoles']);
  }

  getBorderColor(companyName: string): string {
    return this.companyService.getCompanyColor(companyName);
  }

  getCompanyBackground(company: Company): string {
    const color = this.companyService.getCompanyColor(company.name);
    return `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`;
  }

  filterCompanies(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredCompanies = this.companies;
      return;
    }

    const term = searchTerm.toLowerCase();
    this.filteredCompanies = this.companies.filter(company =>
      company.name.toLowerCase().includes(term) ||
      company.description.toLowerCase().includes(term)
    );
  }
}
