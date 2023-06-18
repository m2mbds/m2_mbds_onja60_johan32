import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { User } from './login/user.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion de devoirs à rendre';
  nom: String = "";
  currentRoute: string = "";
  CurrentUser!: User

  constructor(private authService: AuthService,
    private router: Router,
    private assigmmentsService: AssignmentsService) {
    console.log(router.url);

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        this.currentRoute = event.url;
      }
    });


  }
  ngOnInit(): void {
    console.log("OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)");
    var sessionUser = sessionStorage.getItem("CurrentUser");

    if (sessionUser) {
      this.CurrentUser = JSON.parse(sessionUser) as User;
      this.nom = this.CurrentUser.firstname;
      console.log(this.CurrentUser)
    }
  }

  login() {
    // utilise l'authService pour se connecter
    // if (!this.authService.loggedIn) {
    // this.authService.logIn();
    this.router.navigate(["/login"]);
    // on change le label du bouton
    // } else {
    //   this.authService.logOut();
    //   // et on navigue vers la page d'accueil
    //   this.router.navigate(["/home"]);
    // }
  }

  logout() {
    // this.authService.logOut();
    var sessionUser = sessionStorage.getItem("CurrentUser");
    console.log("xxxxxxxxxx");
    if (sessionUser) {
      console.log("1111111111111111111");
      console.log("userData1 ===> " + sessionStorage.getItem("CurrentUser"));
      sessionStorage.removeItem("CurrentUser");
      this.router.navigate(["/login"]);
      console.log("userData2 ===> " + sessionStorage.getItem("CurrentUser"));
    }
    this.authService.logOut();
  }

  isLogged() {
    // if (this.authService.loggedIn) {
    //   this.nom = "Michel Buffa";
    // }
    // return this.authService.loggedIn;
    var sessionUser = sessionStorage.getItem("CurrentUser");
    console.log("sessionUser ===> ", sessionUser)
    if (sessionUser && sessionUser != null) {
      return true;
    } else {
      return false;
    }
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


}
