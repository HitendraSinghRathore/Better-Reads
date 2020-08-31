import { Book } from './../book.model';

import { BookState } from './book.reducer';
import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';

const getFeature = createFeatureSelector<BookState>('book');

export const getSelectedBooks = createSelector(
  getFeature,
  state => {
    if (state.booksList.length === 0) {
      return [];
    } else {
      const filteredList = state.booksList.filter((book: Book) => (
        book.name.toLowerCase().includes(state.searchString.toLowerCase())
      )
      );
      if (state.orderBy === 'likes') {
        filteredList.sort((book1: Book, book2: Book) => (
          book2[state.orderBy].length - book1[state.orderBy].length)
        );
      }
      else { filteredList.sort((book1: Book, book2: Book) => (book1.name < book2.name ? -1 : 1)); }
      console.log(filteredList);
      return filteredList;
    }
  }
);
export const getError = createSelector(
  getFeature,
  state => state.errorMessage
);
export const getBooks = createSelector(
  getFeature,
  state => state.booksList
)
export const getSearchString = createSelector(
  getFeature,
  state => state.searchString
)
export const getOrderedBy = createSelector(
  getFeature,
  state => state.orderBy
)
export const getSelectedBook = createSelector(
  getFeature,
  state => state.selectedBook
)
