// export class Assignment {
//     _id!: string;
//     id!: number;
//     nom!: string;
//     imageEleve?: string;
//     imageProf?: string;
//     nomProf!: string;
//     dateDeRendu!: Date;
//     rendu!: boolean;
//     auteur!: String;
//     matiere!: String;
//     imageMatiere?: String;
//     note?: number;
//     remarque!: String;
// }
import { Observable } from "rxjs";
import { Eleve } from "../eleves/eleve.model";
import { Matiere } from "../matieres/matiere.model";
import { Prof } from "../profs/prof.model";


export class Assignment {
    _id!: String;
    auteur!: String;
    id!: number;
    nom!: string;
    profid!:string;
    eleveid!:String;   
    dateDeRendu!: Date;
    rendu!: boolean;
    matiereid?:string;
    note?: number;
    remarque!: String;
    eleve!:Eleve;
    matiere?:Matiere;
    prof!:Prof;
}



