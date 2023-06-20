import { User } from "../login/user.models";
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
    SubjectData: Subject=new Subject();
    TeacherSubjectData!: any;
    UserData: User[]=[];
}