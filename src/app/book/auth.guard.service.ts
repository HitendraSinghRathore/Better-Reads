import { AuthService } from '../user/auth.service';
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn();
  }
  checkLoggedIn(): boolean {
    if (this.authService.isLoggedIn()) { return true; }
    this.router.navigateByUrl("/login");
    return false;
  }

}
