import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as fromActions from './book.action';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { BookService } from './../book.service';
import { of, Observable } from 'rxjs';
import { Effect } from '@ngrx/effects';
import { Book } from './../book.model';
import { Injectable } from '@angular/core';

@Injectable()
export class BookEffects {
  constructor(private bookService: BookService, private action$: Actions, private router: Router, private toastr: ToastrService) { }
  @Effect()
  loadBooks$: Observable<Action> = this.action$.pipe(
    ofType(fromActions.BookActionTypes.LOAD_BOOKS),
    mergeMap(action =>
      this.bookService.loadBooks().pipe(
        map((books: Book[]) => (new fromActions.LoadBookSuccess(books)),
          catchError(err => of(new fromActions.LoadBookFailure('No Books Found')))
        )
      )
    )
  );
  @Effect()
  selectBook$: Observable<Action> = this.action$.pipe(
    ofType(fromActions.BookActionTypes.SELECT_BOOK),
    map((action: fromActions.SelectBook) => (action.payload)),
    mergeMap((bookId: string) =>
      this.bookService.findBook(bookId).pipe(
        map((product: Book) => new fromActions.SelectBookDone(product)),
        catchError(err => of(new fromActions.InitializeBook()))
      )
    )
  );

  @Effect()
  saveBook$: Observable<Action> = this.action$.pipe(
    ofType(fromActions.BookActionTypes.CREATE_BOOK),
    map((action: fromActions.CreateBook) => action.payload),
    mergeMap((book: Book) =>
      this.bookService.saveNewBook(book).pipe(
        map((bookObj: Book) => {
          this.router.navigateByUrl('/books');
          this.toastr.show("Successfully Saved the book", null, {
            progressBar: false,
            timeOut: 2000,
          });
          return new fromActions.CreateBookSuccess(bookObj);
        }),
        catchError(err => {
          this.toastr.error("Unable to Save", null, {
            progressBar: false,
            timeOut: 2000,
          });
          return of(new fromActions.BookActionFail('Unable to save book'))
        })
      ))
  );
  @Effect()
  updateBook$: Observable<Action> = this.action$.pipe(
    ofType(fromActions.BookActionTypes.UPDATE_BOOK),
    map((action: fromActions.UpdateBook) => action.payload),
    mergeMap((book: Book) =>
      this.bookService.updateBook(book).pipe(
        map((bookObj: Book) => {
          this.router.navigateByUrl('/books');
          this.toastr.show("Successfully Update the book", null, {
            progressBar: false,
            timeOut: 2000,
          });
          return new fromActions.UpdateBookSuccess(bookObj);
        }),
        catchError(err => {
          this.toastr.error("Unable to update", null, {
            progressBar: false,
            timeOut: 2000,
          });
          return of(new fromActions.BookActionFail('Unable to Update the book'))
        })
      ))
  );
  @Effect()
  deleteBook$: Observable<Action> = this.action$.pipe(
    ofType(fromActions.BookActionTypes.DELETE_BOOK),
    map((action: fromActions.DeleteBook) => action.payload),
    mergeMap((bookId: string) =>
      this.bookService.deleteBook(bookId).pipe(
        map((_) => {
          this.router.navigateByUrl('/books');
          this.toastr.show("Successfully Deleted the book", null, {
            progressBar: false,
            timeOut: 2000,
          });
          return new fromActions.DeleteBookSuccess(bookId);
        }),
        catchError(err => {
          this.toastr.error("Unable to delete the book", null, {
            progressBar: false,
            timeOut: 2000
          })
          return of(new fromActions.BookActionFail('Unable to Delete the book'));
        })
      ))
  );
  @Effect()
  updateLikes$: Observable<Action> = this.action$.pipe(
    ofType(fromActions.BookActionTypes.UPDATE_LIKES),
    map((action: fromActions.UpdateLikes) => action.payload),
    mergeMap((book: Book) => this.bookService.updateBook(book).pipe(
      map((bookData: Book) => new fromActions.UpdateBookSuccess(bookData)),
      catchError(err => of(new fromActions.BookActionFail('failed to update Likes')))
    ))
  )

}
