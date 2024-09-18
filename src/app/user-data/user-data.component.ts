import { Component } from '@angular/core';
import { UserDto } from '../models/userDto';
import { AuthService } from '../auth-services/auth.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent {

  userData: UserDto;
  email: string | null;

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.email = localStorage.getItem('email');
    this.authService.getUser(this.email).subscribe((user => {
      console.log(user);
      this.userData = user;
    }))
  }

}
