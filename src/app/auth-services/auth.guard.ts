import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const email = localStorage.getItem('email');
    if (email && this.authService.loggedIn(email)) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
