import { Observable } from 'rxjs';
import { UserForm } from './../../user.model';
import { UserState } from './../../store/user.reducer';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as UserActions from './../../store/user.actions';
import * as fromUser from './../../store';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errrorMessage$: Observable<string>;
  constructor(private store: Store<UserState>) { }

  ngOnInit(): void {
    this.errrorMessage$ = this.store.pipe(select(fromUser.getError));
  }
  handleSubmit(user: UserForm): void {
    this.store.dispatch(new UserActions.Login(user));
  }
}
