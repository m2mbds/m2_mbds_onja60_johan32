import { Observable } from "rxjs";
import { Eleve } from "../eleves/eleve.model";
import { User } from "../login/user.models";
import { Matiere } from "../matieres/matiere.model";
import { Prof } from "../profs/prof.model";
import { Subject } from "../subjects/subjects.models";

export class Assignment {
    _id!: String;
    id!: Number;
    title!: String;
    description!: String;
    PJ!: String;
    idSubject!: Number;
    idAuthor!: Number;
    note!: Number;
    remark!: String;
    isRender!: Boolean;
    limitDate!: Date;
    createdAt!: Date;
    renderedAt!: Date;
    SubjectData!: Subject;
    TeacherSubjectData!: any;
    UserData!: User[];
}