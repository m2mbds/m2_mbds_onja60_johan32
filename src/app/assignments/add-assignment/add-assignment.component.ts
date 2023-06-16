import { Component, OnInit, ViewChild } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingBarComponent } from 'src/app/loading-bar/loading-bar.component';
import { ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Matiere } from 'src/app/matieres/matiere.model';
import { ElevesService } from 'src/app/shared/eleves.service';
import { Eleve } from 'src/app/eleves/eleve.model';
import { ProfsService } from 'src/app/shared/profs.service';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent
// implements OnInit 
{
  constructor(private _formBuilder: FormBuilder) { }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  // contentTitle = 'Ajout d\'un Assignment';
  // // champs du formulaire
  // nomDevoir = "";
  // dateDeRendu!: Date;
  // auteur!: String;
  // matiere?: string;
  // //liste des matieres
  // matiereList!: Matiere[];
  // //liste des eleves
  // eleveList!: Eleve[];
  // note?: number = undefined;
  // remarque!: String;
  // haveNote = false;
  // stringNote = "ajouter une Note";
  // uploadedFiles: Array<File> = [];
  // idImageEleve!: string;
  // fileImg!: string;
  // linkIdImageEleve!: string;
  // isImageExist = false;
  // nouvelAssignment = new Assignment();
  // file_store!: FileList | null;
  // display: FormControl = new FormControl("", Validators.required);

  // auteurList!: Eleve[];

  // index = 0
  // ColorCss!: string;
  // IconCss!: string;
  // Icon!: string;
  // IconWarnCss!: string;
  // ColorWarnCss!: string;
  // IconWarn!: string;

  // IconImageWarnCss!: string;
  // ColorImageWarnCss!: string;
  // IconImageWarn!: string;
  // rowHeight!: number;



  // //liste des fichiers Profs et Matiere
  // uploadedProfFiles: Array<File> = [];
  // //fichier prof convertit en base64
  // fileProfImg!: string;
  // //control de valeur du prof
  // displayProf: FormControl = new FormControl("", Validators.required);

  // //liste des fichiers Profs et Matiere
  // uploadedMatiereFiles: Array<File> = [];
  // //fichier prof convertit en base64
  // fileMatierefImg!: string;
  // //control de valeur du prof
  // displayMatiere: FormControl = new FormControl("", Validators.required);

  // @ViewChild('stepper') stepper!: MatStepper;

  // @ViewChild('divstep') elementView!: any;

  // constructor(private assignmentsService: AssignmentsService,
  //   private router: Router, private dialog: MatDialog, private _snackBar: MatSnackBar, private _matiere: MatieresService, private eleveService: ElevesService, private profService: ProfsService) { }

  // ngOnInit(): void {
  //   this._matiere.getMatieres().subscribe(result => {
  //     this.matiereList = result;
  //     console.log(this.matiereList)
  //   })
  //   this.eleveService.getEleves().subscribe(result => {
  //     this.auteurList = result;
  //   })
  //   // this.matiereList = this._matiere.getMatieres();

  // }

  // onSubmit(event: any) {
  //   console.log("Submit")
  //   // On vérifie que les champs ne sont pas vides
  //   if ((this.nomDevoir === undefined || this.nomDevoir === "" || this.nomDevoir === null)
  //     || (this.auteur === undefined || this.auteur === "" || this.auteur === null)
  //     || (this.matiere === undefined)
  //   ) return;
  //   if (this.dateDeRendu === undefined) return;
  //   // génération d'id, plus tard ce sera fait dans la BD
  //   this.nouvelAssignment.id = Math.abs(Math.random() * 1000000000000000);
  //   this.nouvelAssignment.dateDeRendu = this.dateDeRendu;
  //   this.nouvelAssignment.nom = this.nomDevoir;
  //   this.nouvelAssignment.rendu = false;
  //   this.nouvelAssignment.eleveid = this.auteur;
  //   this.nouvelAssignment.matiereid = this.matiere;
  //   this.nouvelAssignment.note = this.note;
  //   this.nouvelAssignment.remarque = this.remarque;

  //   console.log(this.nouvelAssignment);


  //   //lit le fichier
  //   const reader = new FileReader();
  //   console.log(this.uploadedFiles)
  //   if (this.uploadedFiles.length > 0) {
  //     reader.readAsDataURL(this.uploadedFiles[0]);
  //   }
  //   this.upload();
  // }

  // changeAuthor() {
  //   if (this.matiere)
  //     this.profService.getProf(this.matiere).subscribe(result => {
  //       console.log(result)
  //       if (result) {
  //         this.nouvelAssignment.profid = result._id;
  //         console.log("id du prof " + this.nouvelAssignment.profid);
  //       }
  //     });
  // }

  // addNote() {
  //   if (!this.haveNote) {
  //     this.stringNote = "Enlever la note";
  //     this.haveNote = true;
  //   }

  //   else {
  //     this.stringNote = "ajouter une Note";
  //     this.haveNote = false;
  //   }
  // }
  // upload() {
  //   var dialogRef = this.dialog.open(LoadingBarComponent, { data: "Chargement.gif" });
  //   dialogRef.disableClose = true;
  //   // let formData = new FormData();
  //   // let formDataProf = new FormData();
  //   // let formDataMatiere = new FormData();
  //   // console.log(this.uploadedFiles)
  //   // for (var i = 0; i < this.uploadedFiles.length; i++) {
  //   //   formData.append("thumbnail", this.uploadedFiles[i]);
  //   // }
  //   // for (var i = 0; i < this.uploadedProfFiles.length; i++) {
  //   //   formDataProf.append("thumbnail", this.uploadedProfFiles[i]);
  //   // }
  //   // for (var i = 0; i < this.uploadedMatiereFiles.length; i++) {
  //   //   formDataMatiere.append("thumbnail", this.uploadedMatiereFiles[i]);
  //   // }

  //   // this.assignmentsService.postFile(formData).pipe(
  //   //   switchMap((res: any) => {
  //   //     console.log("upload");
  //   //     console.log("voici")
  //   //     if (res.datafile.length > 0) {
  //   //       console.log(res.datafile[0])
  //   //       this.idImageEleve = res.datafile[0].id;
  //   //       this.linkIdImageEleve = "https://drive.google.com/uc?export=view&id=" + this.idImageEleve;
  //   //       this.nouvelAssignment.eleve.imageEleve = this.idImageEleve;
  //   //     }
  //   //     else {
  //   //       //this.nouvelAssignment.eleve.imageEleve = undefined;
  //   //     }
  //   //     // return this.assignmentsService.addAssignment(this.nouvelAssignment)
  //   //     return this.assignmentsService.postFile(formDataMatiere).pipe(
  //   //       switchMap((res2: any) => {
  //   //         if (res2.datafile.length > 0) {
  //   //           console.log(res2.datafile[0])
  //   //           this.idImageEleve = res2.datafile[0].id;
  //   //           this.linkIdImageEleve = "https://drive.google.com/uc?export=view&id=" + this.idImageEleve;
  //   //           this.nouvelAssignment.matiere!.imageMatiere = this.idImageEleve;
  //   //         }
  //   //         else {
  //   //           //this.nouvelAssignment.matiere!.imageMatiere = undefined;
  //   //         }
  //   //         return this.assignmentsService.postFile(formDataProf).pipe(
  //   //           switchMap((res3: any) => {
  //   //             if (res3.datafile.length > 0) {
  //   //               this.linkIdImageEleve = "https://drive.google.com/uc?export=view&id=" + this.idImageEleve;
  //   //               this.nouvelAssignment.prof.imageProf = res3.datafile[0].id;
  //   //             }
  //   //             else {
  //   //               //this.nouvelAssignment.prof.imageProf = undefined;
  //   //             }
  //   //             return this.assignmentsService.addAssignment(this.nouvelAssignment);
  //   //           })
  //   //         )
  //   //       })
  //   //     )
  //   //   })        
  //   // )
  //   // .subscribe(message => {
  //   //   console.log("ato ny message")
  //   //   console.log(this.nouvelAssignment)
  //   //   this.isImageExist = true;
  //   //   dialogRef.close();
  //   //   this.openSnackBar(message.message, "Ajout Assignment Fait")
  //   //   this.router.navigate(["/home"]);
  //   //   setTimeout(() => {
  //   //     this._snackBar.dismiss()
  //   //   }, 5000);

  //   // })

  //   this.assignmentsService.addAssignment(this.nouvelAssignment).subscribe(message => {
  //     console.log("ato ny message")
  //     console.log(this.nouvelAssignment)
  //     this.isImageExist = true;
  //     dialogRef.close();
  //     this.openSnackBar(message.message, "Ajout Assignment Fait")
  //     this.router.navigate(["/home"]);
  //     setTimeout(() => {
  //       this._snackBar.dismiss()
  //     }, 5000);

  //   });
  // }


  // handleFileInputChange(l: FileList | null): void {
  //   this.file_store = l;
  //   if (l == null) return
  //   if (l.length) {
  //     const f = l[0];
  //     const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
  //     this.display.patchValue(`${f.name}${count}`);
  //   } else {
  //     this.display.patchValue("");
  //   }
  //   this.uploadedFiles = [];
  //   this.uploadedFiles.push(l[0]);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(l[0]);
  //   reader.onload = () => {
  //     console.log("miditra");
  //     // console.log(reader.result);
  //     this.fileImg = reader.result as string;

  //   };
  //   reader.onloadend = () => {

  //     this.rowHeight = this.elementView.nativeElement.firstChild.clientHeight + 20;
  //     console.log(this.elementView.nativeElement.firstChild.clientHeight);
  //   };

  // }

  // //apres changement photos du prof
  // InputFileProfChange(l: FileList | null): void {
  //   if (l == null) return
  //   if (l.length) {
  //     const f = l[0];
  //     const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
  //     this.displayProf.patchValue(`${f.name}${count}`);
  //   } else {
  //     this.displayProf.patchValue("");
  //   }
  //   this.uploadedProfFiles = [];
  //   this.uploadedProfFiles.push(l[0]);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(l[0]);
  //   reader.onload = () => {
  //     console.log(reader.result);
  //     this.fileProfImg = reader.result as string;

  //   };
  //   reader.onloadend = () => {
  //     //changer la hauteur par rapport a la taille du nouveau element
  //     this.rowHeight = this.elementView.nativeElement.firstChild.clientHeight + 20;
  //     console.log(this.elementView.nativeElement.firstChild.clientHeight);
  //   };

  // }

  // //apres changement photos matiere
  // InputFileMatiereChange(l: FileList | null): void {
  //   if (l == null) return
  //   if (l.length) {
  //     const f = l[0];
  //     const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
  //     this.displayMatiere.patchValue(`${f.name}${count}`);
  //   } else {
  //     this.displayMatiere.patchValue("");
  //   }
  //   this.uploadedMatiereFiles = [];
  //   this.uploadedMatiereFiles.push(l[0]);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(l[0]);
  //   reader.onload = () => {
  //     console.log(reader.result);
  //     this.fileMatierefImg = reader.result as string;
  //   };
  //   reader.onloadend = () => {
  //     //changer la hauteur par rapport a la taille du nouveau element
  //     this.rowHeight = this.elementView.nativeElement.firstChild.clientHeight + 20;
  //     console.log(this.elementView.nativeElement.firstChild.clientHeight);
  //   };

  // }

  // move(index: number) {
  //   if ((this.nomDevoir === undefined || this.nomDevoir === "" || this.nomDevoir === null)
  //     || (this.auteur === undefined || this.auteur === "" || this.auteur === null)
  //     || (this.matiere === undefined)
  //     || (this.dateDeRendu === undefined || this.dateDeRendu === null)
  //   ) {
  //     console.log(this.matiere)
  //     console.log("mbola miditra ato " + this.stepper.selectedIndex)
  //     this.stepper.selectedIndex = 0
  //     this.ColorCss = "border-color: transparent; color:  red;font-size: small;";
  //     this.Icon = "close";
  //     this.IconCss = "color:  red;";
  //   }
  //   else {
  //     this.ColorCss = this.ColorWarnCss = this.IconImageWarnCss = "border-color: transparent; color:  rgb(105, 246, 114);font-size: small;";
  //     this.Icon = this.IconWarnCss = this.IconImageWarn = "check";
  //     this.IconCss = this.IconWarn = this.ColorImageWarnCss = "color:  rgb(105, 246, 114);";
  //   }
  //   if (this.note === undefined || this.note === null) {
  //     this.ColorWarnCss = "border-color: transparent; color:  yellow;font-size: small;";
  //     this.IconWarnCss = "color:  yellow;";
  //     this.IconWarn = "warning";
  //   }
  //   else {
  //     this.ColorWarnCss = "border-color: transparent; color:  rgb(105, 246, 114);font-size: small;";
  //     this.IconWarn = "check";
  //     this.IconWarnCss = "color:  rgb(105, 246, 114);";
  //   }
  //   if (this.display.status !== "VALID") {
  //     this.IconImageWarnCss = "border-color: transparent; color:  yellow;font-size: small;";
  //     this.ColorImageWarnCss = "color:  yellow;";
  //     this.IconImageWarn = "warning";
  //   }
  //   else {
  //     this.IconImageWarnCss = "border-color: transparent; color:  rgb(105, 246, 114);font-size: small;";
  //     this.IconImageWarn = "check";
  //     this.ColorImageWarnCss = "color:  rgb(105, 246, 114);";
  //   }
  //   this.rowHeight = this.elementView.nativeElement.firstChild.clientHeight + 20;
  //   console.log(this.elementView.nativeElement.firstChild.clientHeight);
  // }

  // ngAfterViewInit() {
  //   console.log(this.elementView);
  //   console.log(this.elementView.nativeElement.firstChild.clientHeight);
  // }
  // moveIs(index: number) {
  //   this.stepper.selectedIndex = index;
  //   console.log(this.elementView.nativeElement.firstChild.clientHeight);
  // }

  // openSnackBar(message: string, action: string) {
  //   console.log(message)
  //   this._snackBar.open(message, action);
  // }

}
