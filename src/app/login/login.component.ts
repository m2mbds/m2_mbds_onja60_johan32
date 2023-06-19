import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { User } from './user.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = "";
  password = "";
  showSpinner = false;
  hide = true;
  constructor(
    private router: Router,
    private userService: UsersService
  ) { }
  login() {
    console.log("LOGIN")
    this.showSpinner = !this.showSpinner;
    let userLogging = new User();
    userLogging.email = this.email;
    userLogging.password = this.password;
    console.log(userLogging);
    //vérifie si l'authentification de l'user 
    this.userService.getUserAuthentification(userLogging).subscribe(userLogging => {
      console.log("userLogging ===> ", userLogging)
      if (userLogging) {
        sessionStorage.setItem('CurrentUser', JSON.stringify(userLogging));
        this.router.navigate(['/home']);
        // window.location.reload()
      }
    }
    )
  }
}
