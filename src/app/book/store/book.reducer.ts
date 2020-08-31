import * as fromActions from './book.action';
import { Book } from './../book.model';

export interface BookState {
  booksList: Book[];
  searchString: string;
  orderBy: string;
  errorMessage: string;
  selectedBook: Book;
};
export const initalState = {
  booksList: [],
  searchString: "",
  orderBy: "likes",
  errorMessage: "",
  selectedBook: null
}
export function reducer(state = initalState, action: fromActions.BookActions) {
  switch (action.type) {
    case fromActions.BookActionTypes.LOAD_BOOK_SUCCESS: {
      return {
        ...state,
        booksList: action.payload,
        errorMessage: ''
        // searchedBooks: action.payload.filter((item: Book) => (
        //   item.name.toLowerCase().includes(state.searchString.toLowerCase())
        // )
        // )
      };
    }
    case fromActions.BookActionTypes.LOAD_BOOK_FAILURE: {
      return {
        ...state,
        booksList: [],
        searchString: '',
        orderBy: 'likes',
        errorMessage: action.payload
      }
    }
    case fromActions.BookActionTypes.SELECT_BOOK_DONE: {
      return {
        ...state,
        selectedBook: action.payload

      }
    }
    case fromActions.BookActionTypes.INITALIZE_BOOK: {
      return {
        ...state,
        selectedBook: {
          id: null,
          name: "",
          author: "",
          addedBy: "",
          tags: [],
          description: "",
          publishYear: "",
          likes: "",
          imgUrl: ""

        }
      }
    }
    case fromActions.BookActionTypes.BOOK_ACTION_FAIL: {
      return {
        ...state,
        errorMessage: action.payload
      }
    }
    case fromActions.BookActionTypes.CREATE_BOOK_SUCCESS: {
      return {
        ...state,
        errorMessage: "",
        booksList: [...state.booksList, action.payload],
        selectedBook: null
      };
    }
    case fromActions.BookActionTypes.UPDATE_BOOK_SUCCESS: {
      return {
        ...state,
        errorMessage: "",
        booksList: state.booksList.map((item: Book) => {
          if (item.id === action.payload.id) { return action.payload; }
          return item;
        }),
        selectedBook: null
      };
    }
    case fromActions.BookActionTypes.DELETE_BOOK_SUCCESS: {
      return {
        ...state,
        errorMessage: "",
        booksList: state.booksList.filter((item: Book) => (item.id !== action.payload)),
        selectedBook: null
      };
    }
    case fromActions.BookActionTypes.UPDATE_ORDER: {
      return {
        ...state,
        orderBy: action.payload
      }
    }
    case fromActions.BookActionTypes.UPDATE_SEARCH: {
      return {
        ...state,
        searchString: action.payload
      }
    }
  }
  return state;
}
