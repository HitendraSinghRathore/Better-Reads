import { LoginGuard } from './login.guard.service';
import { UserEffects } from './store/user.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './container/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { reducer } from './store/user.reducer';
import { FormsModule, ReactiveFormsModule, } from "@angular/forms";
import { LoginFormComponent } from './components/login-form/login-form.component';

const route: Route[] = [{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] }]
@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [CommonModule,
    RouterModule.forChild(route),
    StoreModule.forFeature('user', reducer),
    EffectsModule.forFeature([
      UserEffects
    ]),
    FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule],

})
export class UserModule { }
