import { Component, ViewChild } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { FormBuilder,FormsModule, FormGroup,Validators,FormControl }   from '@angular/forms';

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

  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private assignmentsService: AssignmentsService,
              private router:Router) { }


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
    reader.readAsDataURL(this.uploadedFiles[0]);
    //si le ficchier est chargé excécuter upload
    reader.onload = () => {
      if(reader.result!=null)
      {
        this.upload();
      }
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
   let formData = new FormData();   
   for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("thumbnail", this.uploadedFiles[i]);  
   } 
      this.assignmentsService.postFile(formData).pipe(
        switchMap((res: any)=>{
          console.log("voici")
          console.log(res.datafile[0])
          this.idImageEleve = res.datafile[0].id;
          this.linkIdImageEleve = "https://drive.google.com/uc?export=view&id="+this.idImageEleve;
          this.nouvelAssignment.imageEleve = this.idImageEleve; 
          return this.assignmentsService.addAssignment(this.nouvelAssignment)
        })
      ).subscribe(message=>{ 
        console.log(message)
        console.log(this.nouvelAssignment)
        this.isImageExist = true;
        //this.router.navigate(["/home"]);
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
      console.log(reader.result);
      this.fileImg = reader.result as string;
  };
}

 fileChange(files:any) {
  this.uploadedFiles = [];
  this.uploadedFiles.push(files.target.files[0]);
  //console.log(this.uploadedFiles)

  const reader = new FileReader();
    reader.readAsDataURL(files.target.files[0]);
    reader.onload = () => {
      console.log("miditra");
        
    };

}

move(index: number) {

  this.stepper.selectedIndex = index;
  this.index = index;
}


isLinearvarient = false;
varientfirstFormGroup: FormGroup=Object.create(null);
varientsecondFormGroup: FormGroup=Object.create(null);

}
