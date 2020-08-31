import { AuthService } from './../../../user/auth.service';
import { BookState } from './../../store/book.reducer';
import { Book } from './../../book.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromBook from "./../../store";
import * as bookActions from "./../../store/book.action";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  selectedBook$: Observable<Book>;
  errorMessage$: Observable<string>;
  constructor(private route: ActivatedRoute, private store: Store<BookState>, private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe((data) => {
      this.store.dispatch(new bookActions.SelectBook(data.id));
    });
    this.selectedBook$ = this.store.pipe(select(fromBook.getSelectedBook));
  }
  update(bookObj: Book) {
    const book = {
      ...bookObj
    };
    this.store.dispatch(new bookActions.UpdateBook(book));
    this.router.navigateByUrl("/books");
  }
  createNew(bookObj: Book) {
    const book = {
      ...bookObj, addedBy: this.auth.currentUser.name, likes: []
    };
    this.store.dispatch(new bookActions.CreateBook(book));
  }
  cancelled() {
    this.router.navigateByUrl('/books');

  }
  deleted(bookId: string) {
    this.store.dispatch(new bookActions.DeleteBook(bookId));
  }

}
