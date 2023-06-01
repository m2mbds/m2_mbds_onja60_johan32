import { Component } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

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
  linkIdImageEleve!:string;
  isImageExist=false;
  nouvelAssignment = new Assignment();

  constructor(private assignmentsService: AssignmentsService,
              private router:Router) { }

  onSubmit(event: any) {
   
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
        this.isImageExist = true;
        //this.router.navigate(["/home"]);
      })
 }

 fileChange(files:any) {
  this.uploadedFiles.push(files.target.files[0]);
  console.log(this.uploadedFiles)
}

}
