import { User } from './../../../user/user.model';
import { Book } from './../../book.model';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnChanges {
  @Input() selectedBooks: Book[];
  @Input() searchString: string;
  @Input() errorMessage: string;
  @Input() loggedInUser: User | null;
  @Input() orderBy: string;
  @Output() updateLikes = new EventEmitter<Book>();
  bookdisplayList: any[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedBooks && !changes.selectedBooks.firstChange
    ) {
      this.mapBookList(changes.selectedBooks.currentValue);
    }
  }
  mapBookList(bookList: Book[]) {
    this.bookdisplayList = [];
    if (this.loggedInUser) {
      bookList.map((book: any) => {
        const obj = { ...book, status: book.likes.includes(this.loggedInUser.id) ? 'dislike' : 'like' };
        this.bookdisplayList.push(obj);
      });
    }
    else { this.bookdisplayList = bookList; }
  }
  handleLike(book: any): void {
    const likesArray: string[] = book.status === 'like' ?
      [...book.likes, this.loggedInUser.id]
      : book.likes.filter(item => item !== this.loggedInUser.id);
    const bookObj: Book = {
      id: book.id,
      addedBy: book.addedBy,
      author: book.author,
      description: book.description,
      imgUrl: book.imgUrl,
      name: book.name,
      tags: [...book.tags],
      publishYear: book.publishYear,
      likes: likesArray
    };
    this.updateLikes.emit(bookObj);
  }
}
