import { Component, ViewChild } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { FormBuilder,FormsModule, FormGroup,Validators,FormControl }   from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoadingBarComponent } from 'src/app/loading-bar/loading-bar.component';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {

  // champs du formulaire
  nomDevoir = "";
  dateDeRendu!: Date;
  auteur!:String;
  matiere!:String;
  note?:number=undefined;
  remarque!:String;
  haveNote=false;
  stringNote="ajouter une Note";
  uploadedFiles:Array <File>=[];
  idImageEleve!:string;
  fileImg!:string;
  linkIdImageEleve!:string;
  isImageExist=false;
  nouvelAssignment = new Assignment();
  file_store!: FileList|null;
  display: FormControl = new FormControl("", Validators.required);
  index=0
  ColorCss!:string;
  IconCss!:string;
  Icon!:string;
  IconWarnCss!:string;
  ColorWarnCss!:string;
  IconWarn!:string;

  IconImageWarnCss!:string;
  ColorImageWarnCss!:string;
  IconImageWarn!:string;
  rowHeight!:number;

  @ViewChild('stepper') stepper!: MatStepper;

  @ViewChild('divstep') elementView!: any;

  constructor(private assignmentsService: AssignmentsService,
              private router:Router,private dialog: MatDialog) { }


  onSubmit(event: any) {
   console.log("Submit")
    // On vérifie que les champs ne sont pas vides
    if((this.nomDevoir === undefined || this.nomDevoir==="" || this.nomDevoir===null)
        || (this.auteur === undefined || this.auteur==="" || this.auteur===null)
        || (this.matiere === undefined || this.matiere==="" || this.auteur===null)
      )return;
    if(this.dateDeRendu===undefined)return;
    // génération d'id, plus tard ce sera fait dans la BD
    this.nouvelAssignment.id = Math.abs(Math.random() * 1000000000000000);
    this.nouvelAssignment.dateDeRendu = this.dateDeRendu;
    this.nouvelAssignment.nom = this.nomDevoir;
    this.nouvelAssignment.rendu = false;
    this.nouvelAssignment.auteur = this.auteur;
    this.nouvelAssignment.matiere = this.matiere;
    this.nouvelAssignment.note = this.note;
    this.nouvelAssignment.remarque = this.remarque;

    //lit le fichier
    const reader = new FileReader();
    console.log(this.uploadedFiles)
    if(this.uploadedFiles.length>0){
      reader.readAsDataURL(this.uploadedFiles[0]);
    }
      this.upload();
    //si le ficchier est chargé excécuter upload
      reader.onload = () => {
        // if(reader.result!=null)
        // {
         // this.upload();
        // }
      } 
}

  addNote(){
    if(!this.haveNote){
      this.stringNote = "Enlever la note";
      this.haveNote = true;
    }
   
    else{
      this.stringNote="ajouter une Note";
      this.haveNote = false;
    }
  }
  upload() {
    var dialogRef = this.dialog.open(LoadingBarComponent,{data:"Chargement.gif"});
    dialogRef.disableClose = true;
   let formData = new FormData();   
    console.log(this.uploadedFiles)
   for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("thumbnail", this.uploadedFiles[i]);  
   } 
      this.assignmentsService.postFile(formData).pipe(
        switchMap((res: any)=>{
          console.log("upload");
          console.log("voici")
          if(res.datafile.length>0){
            console.log(res.datafile[0])
            this.idImageEleve = res.datafile[0].id;
            this.linkIdImageEleve = "https://drive.google.com/uc?export=view&id="+this.idImageEleve;
            this.nouvelAssignment.imageEleve = this.idImageEleve; 
          }
          else{
            this.nouvelAssignment.imageEleve = undefined; 
          }          
          return this.assignmentsService.addAssignment(this.nouvelAssignment)
        })
      ).subscribe(message=>{      
        console.log(message)
        console.log(this.nouvelAssignment)
        this.isImageExist = true;
        dialogRef.close();
        this.router.navigate(["/home"]);
      })
 }


 handleFileInputChange(l: FileList|null): void {
  this.file_store = l;
  if(l==null) return
  if (l.length) {
    const f = l[0];
    const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
    this.display.patchValue(`${f.name}${count}`);
  } else {
    this.display.patchValue("");
  }
  this.uploadedFiles = [];
  this.uploadedFiles.push(l[0]);
  const reader = new FileReader();
  reader.readAsDataURL(l[0]);
  reader.onload = () => {
    console.log("miditra");
      // console.log(reader.result);
      this.fileImg = reader.result as string;
      
  };
  reader.onloadend = () => {

    this.rowHeight = this.elementView.nativeElement.firstChild.clientHeight;
      console.log(this.elementView.nativeElement.firstChild.clientHeight);
  };
  
}

move(index: number) {
  if((this.nomDevoir === undefined || this.nomDevoir==="" || this.nomDevoir===null)
        || (this.auteur === undefined || this.auteur==="" || this.auteur===null)
        || (this.matiere === undefined || this.matiere==="" || this.auteur===null)
        || (this.dateDeRendu === undefined || this.dateDeRendu===null)
      ){
        console.log("mbola miditra ato "+this.stepper.selectedIndex)
        this.stepper.selectedIndex=0
        this.ColorCss = "border-color: transparent; color:  red;font-size: small;";
        this.Icon = "close";
        this.IconCss = "color:  red;";
      }
      else{
        this.ColorCss=this.ColorWarnCss = this.IconImageWarnCss = "border-color: transparent; color:  rgb(105, 246, 114);font-size: small;";
        this.Icon = this.IconWarnCss = this.IconImageWarn  = "check";
        this.IconCss = this.IconWarn = this.ColorImageWarnCss="color:  rgb(105, 246, 114);";
      }
      if(this.note === undefined || this.note===null){
        this.ColorWarnCss = "border-color: transparent; color:  yellow;font-size: small;";
        this.IconWarnCss = "color:  yellow;";
        this.IconWarn = "warning";
      }
      else{
        this.ColorWarnCss = "border-color: transparent; color:  rgb(105, 246, 114);font-size: small;";
        this.IconWarn  = "check";
        this.IconWarnCss = "color:  rgb(105, 246, 114);";
      }
      if(this.display.status!=="VALID"){
        this.IconImageWarnCss = "border-color: transparent; color:  yellow;font-size: small;";
        this.ColorImageWarnCss = "color:  yellow;";
        this.IconImageWarn = "warning";
      }
      else{
        this.IconImageWarnCss = "border-color: transparent; color:  rgb(105, 246, 114);font-size: small;";
        this.IconImageWarn  = "check";
        this.ColorImageWarnCss="color:  rgb(105, 246, 114);";
      }  
      this.rowHeight =this.elementView.nativeElement.firstChild.clientHeight;
      console.log(this.elementView.nativeElement.firstChild.clientHeight);
  }

  ngAfterViewInit() {
    console.log(this.elementView);
    console.log(this.elementView.nativeElement.firstChild.clientHeight);
}
  moveIs(index: number){
      this.stepper.selectedIndex = index;
      console.log(this.elementView.nativeElement.firstChild.clientHeight);
  }
}
