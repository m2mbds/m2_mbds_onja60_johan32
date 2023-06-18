import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarComponent } from 'src/app/loading-bar/loading-bar.component';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  // associées aux champs du formulaire
  nomAssignment!: String;
  renderAt!: Date;
  title!: String;
  description!: String;
  note!: Number;
  remark!: String;
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAssignment();
  }
  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = this.route.snapshot.params['id'];

    // Exemple de récupération des query params (après le ? dans l'url)
    const queryParams = this.route.snapshot.queryParams;
    console.log(queryParams);
    console.log("nom :" + queryParams['nom'])
    console.log("matière :" + queryParams['matiere'])

    // Exemple de récupération du fragment (après le # dans l'url)
    const fragment = this.route.snapshot.fragment;
    console.log("Fragment = " + fragment);

    this.assignmentsService.getAssignment(id)
      .subscribe((assignment) => {
        if (!assignment) return;
        this.assignment = assignment;
        // Pour pré-remplir le formulaire
        this.title = assignment.title;
        this.description = assignment.description;
        this.renderAt = assignment.renderedAt;
        this.note = assignment.note;
        this.remark = assignment.remark;

      });
  }
  onSaveAssignment() {
    if (!this.assignment) return;
    console.log("save edit");
    var dialogRef = this.dialog.open(LoadingBarComponent, { data: "brush.gif" });
    //pour eviter de skipper le chargement
    dialogRef.disableClose = true;
    // on récupère les valeurs dans le formulaire
    this.assignment.description = this.description;
    this.assignment.renderedAt = this.renderAt;
    this.assignment.title = this.title;
    this.assignment.note = this.note;
    this.assignment.remark = this.remark;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);

        this.openSnackBar(message.message, "Edition Assignment Fait")
        dialogRef.close();
        // navigation vers la home page
        this.router.navigate(["/home"]);

        setTimeout(() => {
          this._snackBar.dismiss()
        }, 5000);
      });
  }

  openSnackBar(message: string, action: string) {
    console.log(message)
    this._snackBar.open(message, action);
  }
}


