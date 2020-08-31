import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

const getFeatureState = createFeatureSelector<UserState>('user');

export const getLoggedInUser = createSelector(
  getFeatureState,
  state => state.currentUser
);

export const getError = createSelector(
  getFeatureState,
  state => state.errorMessage
)
