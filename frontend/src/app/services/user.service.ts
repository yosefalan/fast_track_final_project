import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private loggedInUserSource = new BehaviorSubject<User | null>(null);
  loggedInUser = this.loggedInUserSource.asObservable();
  isLoggedIn = false;

  constructor() {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      this.loggedInUserSource.next(JSON.parse(savedUser));
      this.isLoggedIn = true;
    }
  }
  updateLoggedInUser(userData: User) {
    this.loggedInUserSource.next(userData);
    this.isLoggedIn = true;
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  }

  logout() {
    this.loggedInUserSource.next(null);
    this.isLoggedIn = false;
    localStorage.removeItem('loggedInUser');
  }

  getUserId(): number | null {
    return this.loggedInUserSource.value?.id ?? null;
  }
}
