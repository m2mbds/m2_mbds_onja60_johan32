import { Component, OnInit, ViewChild } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingBarComponent } from 'src/app/loading-bar/loading-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'src/app/subjects/subjects.models';
import { SubjectsService } from 'src/app/shared/subjects.service';
import { User } from 'src/app/login/user.models';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private assignmentsService: AssignmentsService,
    private subjectsService: SubjectsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) { }

  //liste des Matières
  subjects!: Subject[];
  //dans le formulaire 
  idSubject!: Number;
  title!: String;
  description!: String;
  PJ!: String;
  deadline!: Date;
  CurrentUser!: User
  file_store!: FileList | null;
  uploadedFiles: Array<File> = [];
  display: FormControl = new FormControl("", Validators.required);
  assignment = new Assignment();
  //onInit
  ngOnInit(): void {
    this.subjectsService.getSubject().subscribe(subjects => {
      if (subjects) this.subjects = subjects;
    })
    var sessionUser = sessionStorage.getItem("CurrentUser");

    if (sessionUser) {
      // console.log(sessionUser)
      this.CurrentUser = JSON.parse(sessionUser) as User;
      console.log(this.CurrentUser)
    }
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    idSubject: ['', Validators.required],
    deadline: ['', Validators.required]

  });
  secondFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    PJ: ['', Validators.required],
  });


  //les methodes
  createAssignment() {
    // let assignment = new Assignment();

    this.assignment.idAuthor = this.CurrentUser.id;
    if (
      this.firstFormGroup.value.idSubject
      && this.firstFormGroup.value.deadline
      && this.secondFormGroup.value.description
      && this.secondFormGroup.value.title
    ) {
      this.assignment.idSubject = +this.firstFormGroup.value.idSubject;
      this.assignment.title = this.secondFormGroup.value.title;
      this.assignment.description = this.secondFormGroup.value.description;
      this.assignment.PJ = this.PJ;
      this.assignment.createdAt = new Date();
      this.assignment.isRender = false;
      this.assignment.renderedAt = new Date(this.firstFormGroup.value.deadline);

      //appel du service ajout des PS et sauvegarde de l'assignment
      this.uploadFiles();
    }

  }
  //chargement du fichier
  InputFileChange(l: FileList | null): void {
    this.file_store = l;
    if (l == null) return
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }
    this.uploadedFiles = [];
    this.uploadedFiles.push(l[0]);
  }
  //ajouter la PS si il y en a
  uploadFiles() {
    //dialog de chargement pour l'ajout
    var dialogRef = this.dialog.open(LoadingBarComponent, { data: "hourglass_empty.gif" });
    //pour eviter de skipper le chargement
    dialogRef.disableClose = true;
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("thumbnail", this.uploadedFiles[i]);
    }
    //service qui sert a ajouter le fichier
    this.assignmentsService.postFile(formData).pipe(
      switchMap((res: any) => {
        if (res.datafile.length > 0) {
          console.log(res.datafile[0])
          this.assignment.PJ = res.datafile[0].id;
        }
        return this.assignmentsService.addAssignment(this.assignment)
      })
    )
      .subscribe(message => {
        console.log(message);
        dialogRef.close();
        this.openSnackBar(message.message, "Ajout Assignment Fait")
        this.router.navigate(["/home"]);
        setTimeout(() => {
          this._snackBar.dismiss()
        }, 5000);
      })
  }

  openSnackBar(message: string, action: string) {
    console.log(message)
    this._snackBar.open(message, action);
  }
}
