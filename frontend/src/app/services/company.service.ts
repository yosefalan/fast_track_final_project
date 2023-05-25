import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Company from '../models/Company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private selectedCompanySource = new BehaviorSubject<Company | null>(null);
  selectedCompany = this.selectedCompanySource.asObservable();
  private localStorageKey = 'selectedCompany';


  constructor() {
    const savedCompany = localStorage.getItem(this.localStorageKey);
    if (savedCompany) {
      this.selectedCompanySource.next(JSON.parse(savedCompany));
    }
  }

   updateselectedCompany(company: Company) {
    this.selectedCompanySource.next(company);
    localStorage.setItem(this.localStorageKey, JSON.stringify(company));
  }

  clearSelectedCompany() {
    this.selectedCompanySource.next(null);
    localStorage.removeItem(this.localStorageKey);
  }
}
