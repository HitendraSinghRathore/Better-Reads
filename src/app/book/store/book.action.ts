import { Book } from './../book.model';
import { Action } from "@ngrx/store";

export enum BookActionTypes {
  LOAD_BOOKS = "[Book] LOAD_BOOKS",
  LOAD_BOOK_SUCCESS = "[Book]LOAD_BOOKS_SUCCESS",
  LOAD_BOOK_FAILURE = "[Book]LOAD_BOOK_FAILURE",
  SELECT_BOOK = "[Book]SELECT_BOOK",
  SELECT_BOOK_DONE = "[Book]SELECT_BOOK_DONE",
  INITALIZE_BOOK = "[Book]INITIALIZE_BOOK",
  CREATE_BOOK = "[Book]CREATE_BOOK",
  CREATE_BOOK_SUCCESS = "[Book]CREATE_BOOK_SUCCESS",
  UPDATE_BOOK = "[Book]UPDATE_BOOK",
  UPDATE_BOOK_SUCCESS = "[Book]UPDATE_BOOK_SUCCESS",
  DELETE_BOOK = "[Book]DELETE_BOOK",
  DELETE_BOOK_SUCCESS = "[Book]DELETE_BOOK_SUCCESS",
  BOOK_ACTION_FAIL = "[Book]BOOK_ACTION_FAIL",
  UPDATE_LIKES = "[Book]BOOK_UPDATE_LIKES",
  UPDATE_ORDER = "[Book]UPDATE_BOOK_ORDER",
  UPDATE_SEARCH = "[Book]UPDATE_BOOK_SEARCH"

}

export class LoadBooks implements Action {
  readonly type = BookActionTypes.LOAD_BOOKS;

}
export class LoadBookSuccess implements Action {
  readonly type = BookActionTypes.LOAD_BOOK_SUCCESS;
  constructor(public payload: Book[]) { }
}
export class LoadBookFailure implements Action {
  readonly type = BookActionTypes.LOAD_BOOK_FAILURE;
  constructor(public payload: string) { }
}
export class SelectBook implements Action {
  readonly type = BookActionTypes.SELECT_BOOK;
  constructor(public payload: string) { }
}
export class SelectBookDone implements Action {
  readonly type = BookActionTypes.SELECT_BOOK_DONE;
  constructor(public payload: Book) { }
}
export class InitializeBook implements Action {
  readonly type = BookActionTypes.INITALIZE_BOOK;
}
export class CreateBook implements Action {
  readonly type = BookActionTypes.CREATE_BOOK;
  constructor(public payload: Book) { }
}
export class CreateBookSuccess implements Action {
  readonly type = BookActionTypes.CREATE_BOOK_SUCCESS;
  constructor(public payload: Book) { }
}
export class BookActionFail implements Action {
  readonly type = BookActionTypes.BOOK_ACTION_FAIL;
  constructor(public payload: string) { }
}
export class UpdateBook implements Action {
  readonly type = BookActionTypes.UPDATE_BOOK;
  constructor(public payload: Book) { }
}
export class UpdateBookSuccess implements Action {
  readonly type = BookActionTypes.UPDATE_BOOK_SUCCESS;
  constructor(public payload: Book) { }
}

export class DeleteBook implements Action {
  readonly type = BookActionTypes.DELETE_BOOK;
  constructor(public payload: string) { }
}
export class DeleteBookSuccess implements Action {
  readonly type = BookActionTypes.DELETE_BOOK_SUCCESS;
  constructor(public payload: string) { }

}
export class UpdateLikes implements Action {
  readonly type = BookActionTypes.UPDATE_LIKES;
  constructor(public payload: Book) { }
}
export class UpdateOrder implements Action {
  readonly type = BookActionTypes.UPDATE_ORDER;
  constructor(public payload: string) { }
}
export class UpdateSearch implements Action {
  readonly type = BookActionTypes.UPDATE_SEARCH;
  constructor(public payload: string) { }
}

export type BookActions = LoadBooks
  | LoadBookSuccess
  | LoadBookFailure
  | SelectBook
  | SelectBookDone
  | InitializeBook
  | CreateBook
  | CreateBookSuccess
  | BookActionFail
  | UpdateBook
  | UpdateBookSuccess
  | DeleteBook
  | DeleteBookSuccess
  | UpdateLikes
  | UpdateSearch
  | UpdateOrder;
