import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private selectedCompanyIdSource = new BehaviorSubject<number | null>(null);
  selectedCompanyId = this.selectedCompanyIdSource.asObservable();

  updateSelectedCompanyId(companyId: number) {
    this.selectedCompanyIdSource.next(companyId);
  }
}
