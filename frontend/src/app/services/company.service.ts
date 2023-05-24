import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Company from '../models/Company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private selectedCompanyIdSource = new BehaviorSubject<Company | null>(null);
  selectedCompanyId = this.selectedCompanyIdSource.asObservable();

  updateSelectedCompanyId(company: Company) {
    this.selectedCompanyIdSource.next(company);
  }
}
