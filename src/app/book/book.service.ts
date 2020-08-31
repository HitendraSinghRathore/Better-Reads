import { throwError, Observable } from 'rxjs';
import { Book } from './book.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private http: HttpClient) { }
  loadBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`http://localhost:3000/books`).pipe(
      catchError(this.handleError)
    );
  }
  findBook(bookId: string) {
    return this.http.get(`http://localhost:3000/books/${bookId}`).pipe(
      catchError(this.handleError)
    );
  }
  saveNewBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`http://localhost:3000/books`, book).pipe(
      catchError(this.handleError)
    );
  }
  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`http://localhost:3000/books/${book.id}`, book).pipe(
      catchError(this.handleError)
    );
  }
  deleteBook(bookId: string) {
    return this.http.delete(`http://localhost:3000/books/${bookId}`).pipe(
      catchError(this.handleError)
    );
  }
  handleError() {
    return throwError('Some Error Occured whhile handling books.');
  }

}
