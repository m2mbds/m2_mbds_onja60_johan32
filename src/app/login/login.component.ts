import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = "";
  password = "";
  showSpinner = false;
  hide = true;
  constructor(
    private router: Router
  ) { }
  login() {
    console.log("LOGIN")
    // this.showSpinner = !this.showSpinner;
    this.router.navigate(['/home']);
  }
}
