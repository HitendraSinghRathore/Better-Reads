import { UserForm, User } from './../user.model';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
  LOGIN = `[USER] LOGIN START`,
  LOGIN_SUCCESS = `[USER] LOGIN SUCCESS`,
  LOGIN_FAILURE = `[USER] LOGIN FAILED`,
  LOGOUT = `[USER] LOGOUT`,
  LOGOUT_DONE = `[USER] LOGOUT_DONE`
}

export class Login implements Action {
  readonly type = UserActionTypes.LOGIN;
  constructor(public payload: UserForm) { }

}

export class LoginSuccess implements Action {
  readonly type = UserActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) { }
}
export class LoginFail implements Action {
  readonly type = UserActionTypes.LOGIN_FAILURE;
  constructor(public payload: string) { }

}
export class Logout implements Action {
  readonly type = UserActionTypes.LOGOUT;

}

export type UserActions = Login | LoginSuccess | LoginFail | Logout;
