import { User } from './../user.model';
import { UserActionTypes, UserActions } from "./user.actions";

export interface UserState {
  currentUser: User;
  errorMessage: string;
}
const initalState = {
  currentUser: null,
  errorMessage: ''
}

export function reducer(state = initalState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.LOGIN_SUCCESS: return {
      ...state,
      errorMessage: '',
      currentUser: action.payload
    };
    case UserActionTypes.LOGIN_FAILURE: return {
      ...state,
      errorMessage: action.payload,
      currentUser: null
    }
    case UserActionTypes.LOGOUT: {

      return {
        ...state,
        currentUser: null
      };
    }
  }

  return state;
}
