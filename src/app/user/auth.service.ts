import { User, UserForm } from './user.model';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null;
  private loggedInUser$ = new BehaviorSubject<User | null>(null);
  logInChanges$ = this.loggedInUser$.asObservable();
  constructor(private http: HttpClient) { }
  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
  login(userData: UserForm): Observable<any> {
    return this.http.get(`http://localhost:3000/users/${userData.id}`).pipe(
      catchError(this.handleError)
    );
  }
  setSession(newUser: User): void {
    //console.log(newUser)
    if (newUser) {
      this.currentUser = newUser;
      this.loggedInUser$.next(newUser);
    }

  }
  logout() {
    this.currentUser = null;
    this.loggedInUser$.next(null);
  }
  private handleError(): Observable<any> {
    const errorMessage = `Some Error Occured. Please try again later.`;
    return throwError(errorMessage);
  }
}
