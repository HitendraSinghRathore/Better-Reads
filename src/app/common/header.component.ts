import { Router } from '@angular/router';
import { Logout } from './../user/store/user.actions';
import { User } from './../user/user.model';
import { Observable } from 'rxjs';
import { UserState } from './../user/store/user.reducer';
import { AuthService } from './../user/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getLoggedInUser } from './../user/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User | null;
  showMenu: boolean;
  user$: Observable<User | null>;
  constructor(private authService: AuthService, private store: Store<UserState>, private router: Router) { }
  ngOnInit(): void {
    this.user$ = this.store.pipe(select(getLoggedInUser));
    this.user$.subscribe((user: User) => this.user = user);
  }
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
  logout(): void {
    this.store.dispatch(new Logout());
    this.authService.logout();
    this.router.navigateByUrl('/home');
    this.showMenu = false;


  }
}
