import { User } from './../../../user/user.model';
import { Book } from './../../book.model';
import { Observable } from 'rxjs';
import { AuthService } from './../../../user/auth.service';
import { BookState } from './../../store/book.reducer';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromActions from './../../store/book.action';
import * as fromBook from './../../store';
import { getLoggedInUser } from "./../../../user/store";
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  selectedBooks$: Observable<Book[]>;
  searchString$: Observable<string>;
  orderBy$: Observable<string>;

  errorMessage$: Observable<string>;
  loggedInUser: Observable<User | null>;
  constructor(private store: Store<BookState>, private authService: AuthService) { }

  ngOnInit(): void {
    this.store.dispatch(new fromActions.LoadBooks());
    this.selectedBooks$ = this.store.pipe(select(fromBook.getSelectedBooks));
    this.errorMessage$ = this.store.pipe(select(fromBook.getError));
    this.searchString$ = this.store.pipe(select(fromBook.getSearchString));
    this.orderBy$ = this.store.pipe(select(fromBook.getOrderedBy));
    this.loggedInUser = this.store.pipe(select(getLoggedInUser));

  }
  handleLikes(book: Book): void {
    this.store.dispatch(new fromActions.UpdateLikes(book));
  }
  searchBooks(str: string): void {
    this.store.dispatch(new fromActions.UpdateSearch(str));
  }
  updateOrderBy(orderBy: string): void {
    this.store.dispatch(new fromActions.UpdateOrder(orderBy));
  }
}
