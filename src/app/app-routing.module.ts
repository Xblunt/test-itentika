import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserDataComponent } from './user-data/user-data.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth-services/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: RegistrationComponent },
  { path: 'user', component: UserDataComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
