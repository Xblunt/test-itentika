import { Component } from '@angular/core';
import { AuthService } from '../auth-services/auth.service';
import { UserDto } from '../models/userDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  newUser: UserDto;
  error: string | null = null;
  confirmPassword: string;
  pageId: number = 1;
  isPasswordValid: boolean = true;
  emailExists: boolean = false;

  constructor(private authService: AuthService, private router: Router){
    this.newUser = new UserDto();
  }

  ngOnInit(){
    console.log(localStorage);
    const email = localStorage.getItem('email');
    if(email){
      this.router.navigate(['/user']);
    }
  }

  nextPage(page: number){
    this.pageId = page;
  }

  emailInvalid() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return this.newUser.email ? !this.newUser.email.match(emailPattern) : false;
  }


  validateEmail() {
    if (!this.emailInvalid()) {
        this.emailExists = localStorage.getItem(this.newUser.email) !== null;
    } else {
        this.emailExists = false;
    }
  }

  phoneInvalid() {
    const phonePattern = /^\+7\d{10}$/;
    return this.newUser.phone ? !this.newUser.phone.match(phonePattern) : false;
  }

  validPassword() {
    this.isPasswordValid = this.newUser.password === this.confirmPassword;
  }

  registration() {
    this.authService.register(this.newUser).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/']);
      },
      error => {
        this.error = error;
      }
    );
  }

}
