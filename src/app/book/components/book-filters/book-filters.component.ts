import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-filters',
  templateUrl: './book-filters.component.html',
  styleUrls: ['./book-filters.component.scss']
})
export class BookFiltersComponent implements OnInit {
  @Input() orderBy: string;
  @Input() searchData: string;
  @Output() searchBooks = new EventEmitter<string>();
  @Output() updateOrder = new EventEmitter<string>();
  searchString: string;
  constructor() { }

  ngOnInit(): void {
    this.searchString = this.searchData;
  }

  toggleOrder(payload: string) {
    this.updateOrder.emit(payload);
  }
  search() {
    this.searchBooks.emit(this.searchString);
  }
  reset() {
    this.searchString = "";
    this.searchBooks.emit('');
  }
}
