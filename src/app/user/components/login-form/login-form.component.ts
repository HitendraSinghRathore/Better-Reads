import { UserForm } from './../../user.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './../../store/user.reducer';
import * as userActions from './../../store/user.actions';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  @Input() errorMessage: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSubmit = new EventEmitter<UserForm>();
  constructor(private store: Store<UserState>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.buildForm();
  }
  buildForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  submitForm(): void {
    const userData = {
      ...this.loginForm.value,
      id: this.loginForm.get('username').value
    };
    // console.log(userData);
    this.onSubmit.emit(userData);
  }
}
