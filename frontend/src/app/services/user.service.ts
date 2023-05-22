import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedInUserIdSource = new BehaviorSubject<number | null>(null);
  loggedInUserId = this.loggedInUserIdSource.asObservable();

  updateLoggedInUserId(userId: number) {
    this.loggedInUserIdSource.next(userId);
  }

  //TODO: return entire User object to check if user is admin after logging in?
}
