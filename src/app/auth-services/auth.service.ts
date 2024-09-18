import { Injectable } from '@angular/core';
import { UserDto } from '../models/userDto';
import { Observable } from 'rxjs';
import { LoginDto } from '../models/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  register(user: UserDto): Observable<boolean> {
    return new Observable<boolean>(result => {
      setTimeout(() => {
        localStorage.setItem(user.email, JSON.stringify(user));
        result.next(true);
        result.complete();
      }, 100);
    });
  }

  login(loginData: LoginDto): Observable<LoginDto> {
    return new Observable<LoginDto>(result => {
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem(loginData.email)!);
        if (user && user.email === loginData.email) {
          localStorage.setItem('email', loginData.email);
          if(user && user.password === loginData.password){
            result.next(user);
          } else {
            result.error(true);
          }
        } else {
          result.error(false);
        }
        result.complete();
      }, 100);
    });
  }

  getUser(email: string | null): Observable<UserDto> {
    return new Observable<UserDto>(result => {
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem(email!)!);
          const {password, ...userWithoutPassword } = user;
          result.next(userWithoutPassword);
          result.complete();
      }, 100);
    });
  }

  loggedIn(email: string): boolean {
    return localStorage.getItem(email) !== null;
  }


}
