import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingBarComponent } from 'src/app/loading-bar/loading-bar.component';
import { User } from 'src/app/login/user.models';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;
  linkImage = "https://drive.google.com/uc?export=view&id=";
  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  CurrentUser!: User;

  ngOnInit(): void {
    // appelée avant le rendu du composant
    // on va chercher l'id dans l'url active
    // en mettant + on force la conversion en number
    const id = this.route.snapshot.params['id'];
    console.log("Dans le ngOnInit de detail, id = " + id);

    var sessionUser = sessionStorage.getItem("CurrentUser");

    if (sessionUser) {
      // console.log(sessionUser)
      this.CurrentUser = JSON.parse(sessionUser) as User;
      console.log(this.CurrentUser)
    }
    // on va chercher l'assignment à afficher
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
        console.log(assignment)
      });
  }

  onDeleteAssignment() {
    if (!this.assignmentTransmis) return;
    var dialogRef = this.dialog.open(LoadingBarComponent, { data: "delete.gif" });
    //pour eviter de skipper le chargement
    dialogRef.disableClose = true;
    console.log("Suppression de l'assignment " + this.assignmentTransmis.description);


    // on demande au service la suppression de l'assignment
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        // Pour cacher le detail, on met l'assignment à null
        this.assignmentTransmis = undefined;
        this.openSnackBar(message.message, "Suppression Assignment Fait")
        dialogRef.close();
        // navigation vers la home page
        this.router.navigate(["/home"]);

        setTimeout(() => {
          this._snackBar.dismiss()
        }, 5000);
      });

  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;

    this.assignmentTransmis.isRender = true;

    // on appelle le service pour faire l'update
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
      });
  }

  onEditAssignment() {
    // navigation vers la page edit
    // équivalent à "/assignment/2/edit" par exemple
    // path = "/assignment/" + this.assignmentTransmis?.id + "/edit";
    // this.router.navigate([path]);
    // c'est pour vous montrer la syntaxe avec [...]
    this.router.navigate(["/assignments", this.assignmentTransmis?.id, "edit"],
      {
        queryParams: {
          nom: this.assignmentTransmis?.description,
          matiere: "Angular"
        },
        fragment: "edition"
      });
  }

  isLogged() {
    // renvoie si on est loggé ou pas
    return this.authService.loggedIn;
  }


  openSnackBar(message: string, action: string) {
    console.log(message)
    this._snackBar.open(message, action);
  }
}
