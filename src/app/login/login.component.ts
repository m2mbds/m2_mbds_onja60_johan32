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
  email = "";
  password = "";
  showSpinner = false;
  hide = true;
  @Output()
   myEventEmitter: EventEmitter<any> = new EventEmitter<Boolean>();
  constructor(
    private router: Router,
    private userService: UsersService,
    private appComponent:AppComponent
  ) { }
  login() {
    console.log("LOGIN")
    this.showSpinner = !this.showSpinner;
    let userLogging = new User();
    userLogging.email = this.email;
    userLogging.password = this.password;
    //console.log(userLogging);
    //vérifie si l'authentification de l'user 
    this.userService.getUserAuthentification(userLogging).subscribe(userLogging => {
      //console.log("userLogging ===> ", userLogging)
      
      if (userLogging) {
        sessionStorage.setItem('CurrentUser', JSON.stringify(userLogging));
        this.router.navigate(['/home']);
        // window.location.reload()
        this.callMethod(this.appComponent,userLogging.isAdmin)
       
      }
      
    }
         
    )
    
  }

  callMethod(component1: AppComponent,isAdmin:Boolean) {
    component1.checkRole(isAdmin); // Call the method of Component1
  }

  // myEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  
  
    
  // triggerEvent(data: any) {
  //   this.myEventEmitter.emit(data);
  // }
  
}
