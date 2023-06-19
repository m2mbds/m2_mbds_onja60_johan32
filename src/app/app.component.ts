import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { User } from './login/user.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Application de gestion de devoirs à rendre';
  currentRoute: string = "";
  currentUser!: User;
  isLogged: Boolean = false;
  isAdmin!: Boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private assigmmentsService: AssignmentsService
  ) {
    console.log(router.url);
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("hello")
        console.log(event.url);
        this.currentRoute = event.url;
      }
    });


  }
  ngOnInit(): void {
    console.log("OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)");
    var sessionUser = sessionStorage.getItem("CurrentUser");
    if (sessionUser) {
      var userTemp = JSON.parse(sessionUser) as User;
      this.setIsLogged(true);
      this.setCurrentUser(userTemp);
      this.checkRole(userTemp.isAdmin);
    }
    console.log("currentUser ===> ", this.currentUser);
    console.log("isLogged ===> ", this.isLogged);
    console.log("isAdmin ===> ", this.isAdmin);
  }

  logout() {
    this.setIsLogged(false);
    this.authService.logOut();
    this.router.navigate(["./login"]);
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

  checkRole(isAdmin: Boolean) {
    this.isAdmin = isAdmin;
  }

  setCurrentUser(currentUser: User) {
    this.currentUser = currentUser;
  }

  setIsLogged(isLogged: Boolean) {
    this.isLogged = isLogged;
  }
}
