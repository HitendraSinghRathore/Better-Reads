import { Book } from './../../book.model';
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnChanges {

  @Input() selectedBook: Book;
  @Input() errorMessage: string;
  @Output() handleNewForm = new EventEmitter<Book>();
  @Output() handleUpdate = new EventEmitter<Book>();
  @Output() handleDelete = new EventEmitter<string>();
  @Output() handleCancel = new EventEmitter();
  bookForm: FormGroup;
  editMode: boolean;
  get tags(): FormArray {
    return this.bookForm.get('tags') as FormArray;
  }
  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedBook) {
      if (changes.selectedBook.currentValue && changes.selectedBook.currentValue.id != null) {
        this.editMode = true;
        this.createEditForm(changes.selectedBook.currentValue);
      } else {
        this.editMode = false;
        this.createNewForm();
      }
    }
  }
  createNewForm() {
    if (this.bookForm) {
      this.bookForm.reset();
    }
    this.bookForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      publishYear: ['', Validators.required],
      imgUrl: ['', Validators.required],
      tags: this.fb.array([this.buildTag()])
    });
    console.log(this.bookForm);
  }
  buildTag(value = ''): FormControl {
    return this.fb.control(value, Validators.required);
  }
  deleteTag() {
    this.tags.removeAt(this.tags.length - 1);
  }
  addTag() {
    this.tags.push(this.buildTag());
  }

  createEditForm(bookObj: Book) {
    if (this.bookForm) { this.bookForm.reset(); }
    const tagsArray: FormControl[] = bookObj.tags.map((tag) => this.buildTag(tag));
    this.bookForm = this.fb.group({
      id: [bookObj.id],
      name: [bookObj.name, Validators.required],
      author: [bookObj.author, Validators.required],
      description: [bookObj.description],
      publishYear: [bookObj.publishYear, Validators.required],
      imgUrl: [bookObj.imgUrl, Validators.required],
      tags: this.fb.array(tagsArray),
      addedBy: [bookObj.addedBy],
      likes: [bookObj.likes]
    })
  }
  cancelFrom() {
    this.handleCancel.emit();
  }
  submitForm() {
    if (this.editMode) { this.updateForm(this.bookForm.value); }
    else { this.saveNewForm(this.bookForm.value); }
  }
  saveNewForm(bookObj): void {
    this.handleNewForm.emit(bookObj);
  }
  updateForm(bookObj): void {
    this.handleUpdate.emit(bookObj);
  }
  deleteForm() {

    this.handleDelete.emit(this.bookForm.get('id').value);
  }
}
