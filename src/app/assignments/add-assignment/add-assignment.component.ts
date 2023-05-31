import { Component } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';

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


  constructor(private assignmentsService: AssignmentsService,
              private router:Router) { }

  onSubmit(event: any) {
   
    // On vérifie que les champs ne sont pas vides
    if((this.nomDevoir === undefined || this.nomDevoir==="" || this.nomDevoir===null)
        || (this.auteur === undefined || this.auteur==="" || this.auteur===null)
        || (this.matiere === undefined || this.matiere==="" || this.auteur===null)
      )return;
    if(this.dateDeRendu===undefined)return;

    let nouvelAssignment = new Assignment();
   
    // génération d'id, plus tard ce sera fait dans la BD
    nouvelAssignment.id = Math.abs(Math.random() * 1000000000000000);
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.rendu = false;
    nouvelAssignment.auteur = this.auteur;
    nouvelAssignment.matiere = this.matiere;
    nouvelAssignment.note = this.note;
    nouvelAssignment.remarque = this.remarque;
    nouvelAssignment.imageEleve = this.uploadedFiles[0].name;

    console.log(nouvelAssignment.imageEleve);
    // on demande au service d'ajouter l'assignment
    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(message => {
        console.log(message);

        // On va naviguer vers la page d'accueil pour afficher la liste
        // des assignments
        this.router.navigate(["/home"]);

      });
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
        
        //console.log(this.uploadedFiles[i].lastModified);
       // //console.log(this.uploadedFiles[i].name);  
      
       
   } 
       this.assignmentsService.postFile(formData).subscribe((response) => {
           console.log('response received is ', response);
           this.idImageEleve = response.datafile[0].id;
           this.linkIdImageEleve = "https://drive.google.com/uc?export=view&id="+this.idImageEleve; 
           console.log('response received is ', this.idImageEleve);
           this.isImageExist = true;
       });

 }

 fileChange(files:any) {
  this.uploadedFiles = files.target.files;
  
  const reader = new FileReader();
console.log(this.uploadedFiles[0].name)
reader.readAsDataURL(this.uploadedFiles[0]);
reader.onload = () => {
    if(reader.result!=null)
    {
      this.upload();
    }
  }
 
}

}
