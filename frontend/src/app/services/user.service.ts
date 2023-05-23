import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedInUserSource = new BehaviorSubject<User | null>(null);
  loggedInUser = this.loggedInUserSource.asObservable();

  updateLoggedInUser(userData: User) {
    this.loggedInUserSource.next(userData);
  }
}
