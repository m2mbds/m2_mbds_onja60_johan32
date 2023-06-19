import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { User } from './user.models';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = "sonja@gmail.com";
  password = "1234";
  showSpinner = false;
  hide = true;
  @Output()
  myEventEmitter: EventEmitter<any> = new EventEmitter<Boolean>();
  constructor(
    private router: Router,
    private userService: UsersService,
    private appComponent: AppComponent
  ) { }
  login() {
    console.log("LOGIN")
    this.showSpinner = !this.showSpinner;
    let userLogging = new User();
    userLogging.email = this.email;
    userLogging.password = this.password;
    //vérifie si l'authentification de l'user 
    this.userService.getUserAuthentification(userLogging).subscribe(userData => {
      if (userData) {
        sessionStorage.setItem('CurrentUser', JSON.stringify(userData));
        this.router.navigate(['/home']);
        this.callMethod(this.appComponent, true, userData.isAdmin, userData)
      }
    }
    )
  }

  callMethod(componentApp: AppComponent, isLogged: Boolean, isAdmin: Boolean, currentUser: User) {
    componentApp.setIsLogged(isLogged);
    componentApp.checkRole(isAdmin); // Call the method of ComponentApp
    componentApp.setCurrentUser(currentUser);
  }
}
