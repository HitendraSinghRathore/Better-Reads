import { AuthGuard } from './auth.guard.service';
import { BookEffects } from './store/book.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { reducer } from './store/book.reducer';
import { BooksComponent } from './container/books/books.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddBookComponent } from './container/add-book/add-book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookFiltersComponent } from './components/book-filters/book-filters.component';

const routes: Route[] = [{
  path: 'home', component: HomeComponent
},
{
  path: 'books', component: BooksComponent
}, {
  path: 'addBook', component: AddBookComponent, canActivate: [AuthGuard]
}, {
  path: 'addBook/:id', component: AddBookComponent, canActivate: [AuthGuard]
}];

@NgModule({
  declarations: [HomeComponent, BooksComponent, BooksListComponent, AddBookComponent, BookFormComponent, BookFiltersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('book', reducer),
    EffectsModule.forFeature(
      [BookEffects]
    ),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class BooksModule { }
