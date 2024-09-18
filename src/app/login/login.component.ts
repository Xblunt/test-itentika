import { Component } from '@angular/core';
import { LoginDto } from '../models/loginDto';
import { AuthService } from '../auth-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: LoginDto;
  error: boolean;
  isVisualPassword = false;

  constructor(private authService: AuthService, private router: Router){
    this.loginData = new LoginDto();
  }

  ngOnInit(){
    console.log(localStorage);
    const email = localStorage.getItem('email');
    if(email){
      this.router.navigate(['/user']);
    }
  }

  emailInvalid() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return this.loginData.email ? !this.loginData.email.match(emailPattern) : false;
  }

  login() {
    this.authService.login(this.loginData).subscribe(
      user => {
        this.router.navigate(['/user']);
      },
      error => {
        this.error = error;
      }
    );
  }

}
