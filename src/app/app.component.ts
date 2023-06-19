import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { User } from './login/user.models';
import { LoginComponent } from './login/login.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Application de gestion de devoirs à rendre';
  nom: String = "";
  currentRoute: string = "";
  CurrentUser!: User;
  isLogged = false;
  isAdmin!:Boolean;
  @Input()
   myEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  
  constructor(private authService: AuthService,
    private router: Router,
    private assigmmentsService: AssignmentsService 
    ) {
    console.log(router.url);
    console.log("=============constructor=============")

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("hello")
        console.log(event.url);
        this.currentRoute = event.url;
      }
    });


  }
  ngOnInit(): void {
    console.log("=============ngOnInit=============")
    // console.log("OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)");
    var sessionUser = sessionStorage.getItem("CurrentUser");
    
    if (sessionUser) {
      this.isLogged = true;
      // console.log("ngOnInit isLogged ===> " + this.isLogged)
      this.CurrentUser = JSON.parse(sessionUser) as User;
      this.nom = this.CurrentUser.lastname + ' ' + this.CurrentUser.firstname;    
      console.log(this.isAdmin)
    }

    // this.loginComponent.myEventEmitter.subscribe((data) => {
    //   // Handle the emitted event data here
    //   console.log(data);
    // });

  }

  isStudentorTeacher(){
      this.isAdmin = this.CurrentUser.isAdmin;
  }

  logout() {
    this.isLogged = false;
    this.authService.logOut();

    this.router.navigate(["./login"]);
    console.log("logout isLogged ===> " + this.isLogged)
    //this.router.navigate(["/login"]);
    // window.location.reload()
  }

  creerDonneesDeTest() {
    this.assigmmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("Opération terminée, les 1000 données ont été insérées")

        // on refresh la page pour que la liste apparaisse
        // plusieurs manières de faire....
        window.location.reload();
      });
  }

  checkRole(isAdmin:Boolean) {
    // Handle component activation event here
    console.log(this.isLogged);
    this.isLogged = true;
    this.isAdmin = isAdmin;
  }




}
