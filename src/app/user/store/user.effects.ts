import { UserForm, User } from './../user.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as userActions from "./user.actions";
import { mergeMap } from 'rxjs/operators';
@Injectable()
export class UserEffects {
  constructor(private router: Router, private authService: AuthService, private action$: Actions) { }

  @Effect()
  login$: Observable<Action> = this.action$.pipe(
    ofType(userActions.UserActionTypes.LOGIN),
    map((action: userActions.Login) => action.payload),
    mergeMap((user: UserForm) => this.authService.login(user).pipe(
      map(userData => {
        if (userData.password && userData.password === user.password) {
          const userObj: User = {
            id: userData.id,
            username: userData.username,
            name: userData.name
          };
          this.authService.setSession(userObj);
          this.router.navigateByUrl('/home');
          return new userActions.LoginSuccess(userObj);
        }
        return new userActions.LoginFail('Please check your Credentials and try again.')
      }),
      catchError(err => {
        console.log(err);
        return of(new userActions.LoginFail('Some server error occured, please try again later.'))
      })
    ))
  )


}
