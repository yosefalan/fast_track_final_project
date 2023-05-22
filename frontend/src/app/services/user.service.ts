import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedInUserIdSource = new BehaviorSubject<number | null>(null);
  selectedCompanyId = this.loggedInUserIdSource.asObservable();

  updateLoggedInUserId(userId: number) {
    this.loggedInUserIdSource.next(userId);
  }
}
