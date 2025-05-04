import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Console, ConsoleService } from '../../services/console.service';
import { Company, CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-console-list',
  templateUrl: './console-list.component.html',
  styleUrls: ['./console-list.component.css']
})
export class ConsoleListComponent implements OnInit {
  consoles: Console[] = [];
  filteredConsoles: Console[] = [];
  currentCompany?: Company;
  isLoading: boolean = true;

  constructor(
    private consoleService: ConsoleService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const companyId = Number(params['companyId']);
      this.loadCompanyAndConsoles(companyId);
    });
  }

  private loadCompanyAndConsoles(companyId: number): void {
    this.isLoading = true;
    this.currentCompany = this.companyService.getCompanyById(companyId);
    
    if (!this.currentCompany) {
      this.router.navigate(['/']);
      return;
    }

    this.consoles = this.consoleService.getConsolesByCompanyId(companyId);
    this.filteredConsoles = this.consoles;
    this.isLoading = false;
  }

  viewGames(console: Console): void {
    this.router.navigate(['/console', console.id, 'games']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getConsoleBackground(console: Console): string {
    const color = this.companyService.getCompanyColor(this.currentCompany?.name || '');
    return `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`;
  }

  getBorderColor(): string {
    return this.companyService.getCompanyColor(this.currentCompany?.name || '');
  }
}
