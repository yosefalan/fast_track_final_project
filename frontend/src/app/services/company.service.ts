import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Company from '../models/Company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private selectedCompanySource = new BehaviorSubject<Company | null>(null);
  selectedCompany = this.selectedCompanySource.asObservable();

  updateselectedCompany(company: Company) {
    this.selectedCompanySource.next(company);
  }

  getCompanyId(): number | null {
    return this.selectedCompanySource.value?.id ?? null;
  }
}
