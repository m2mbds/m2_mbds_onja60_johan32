import { Component, NgZone, OnInit, Pipe, ViewChild } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, switchMap, tap, throttleTime } from 'rxjs';

// 
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { User } from '../login/user.models';
import { SubjectsService } from '../shared/subjects.service';
import { Subject } from '../subjects/subjects.models';
import { MatDialog } from '@angular/material/dialog';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';
// 

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  contentTitle = 'Liste des devoirs à rendre';
  // les données à afficher
  assignments: Assignment[] = [];
  // Pour la data table
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu'];
  // displayedColumns: string[] = ['id', 'nom'];

  // propriétés pour la pagination
  page: number = 1;
  limit: number = 4;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  linkImage = "https://drive.google.com/uc?export=view&id=";
  CurrentUser!: User;
  isLogged = false;
  i:number=0;
  isInit = true;
  

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(private assignmentsService: AssignmentsService,
    private subjectService: SubjectsService,
    private ngZone: NgZone,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log("OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)");
    //enregistrer la session de l'user dans sessionStorage
    var sessionUser = sessionStorage.getItem("CurrentUser");

    if (sessionUser) {
      this.isLogged = true;
      this.CurrentUser = JSON.parse(sessionUser) as User;
      console.log(this.CurrentUser)
    }

    // exercice : regarder si il existe des query params
    // page et limit, récupérer leur valeurs si elles existent
    // et les passer à la méthode getAssignments
    // TODO

    this.getAssignments();
    
  }

  ngAfterViewInit() {
    console.log("after view init");

    if (!this.scroller) return;

    // on s'abonne à l'évènement scroll de la liste
    this.scroller.elementScrolled()
      .pipe(
        tap(event => {
          //console.log(event);
        }),
        map(event => {
          return this.scroller.measureScrollOffset('bottom');
        }),
        tap(y => {
          //console.log("y = " + y);
        }),
        pairwise(),
        tap(([y1, y2]) => {
          //console.log("y1 = " + y1 + " y2 = " + y2);
        }),
        filter(([y1, y2]) => {
          return y2 < y1 && y2 < 100;
        }),
        // Pour n'envoyer des requêtes que toutes les 200ms
        //throttleTime(200)
      )
      .subscribe((val) => {
        console.log("val = " + val);
        if(this.i>0)return;
        console.log("je CHARGE DE NOUVELLES DONNEES page = " + this.page);
        this.i = this.i+1;
        this.ngZone.run(() => {
          if (!this.hasNextPage) return;

          this.page = this.nextPage;
          this.getAddAssignmentsForScroll();
        });
      });
  }

  

  getAssignments() {
    console.log("On va chercher les assignments dans le service");
    
    var dialogRef = this.dialog.open(LoadingBarComponent, { data: "toys.gif" });
    //pour eviter de skipper le chargement
    if(this.isInit)dialogRef.disableClose = true;
    this.assignmentsService.getAssignments(this.page, this.limit)
      .subscribe((data) => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log("Données reçues");
        console.log(this.assignments);
        // this.todo = data.docs;
    
        this.todo = this.assignments.filter(x=>x.isRender==true)
        this.done = this.assignments.filter(x=>x.isRender==false)
        console.log(this.todo)
        console.log(this.done)
        if(this.isInit)[
          
          dialogRef.close()
        ]
        this.isInit = false
      });
  }



  getAddAssignmentsForScroll() {
    this.assignmentsService.getAssignments(this.page, this.limit)
      .subscribe(data => {
        // au lieu de remplacer le tableau, on va concaténer les nouvelles données
        this.assignments = this.assignments.concat(data.docs);
        // ou comme ceci this.assignments = [...this.assignments, ...data.docs]
        //this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        this.i = 0;
        console.log("Données ajoutées pour scrolling");
      });
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignments();
  }
  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  // Pour mat-paginator
  handlePage(event: any) {
    console.log(event);

    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getAssignments();
  }
  // ==========================================================
   todo:Assignment[] = [] //this.assignments.filter(x=>!x.isRender) as Array<Assignment>;//['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  
   done:Assignment[] = [] //this.assignments.filter(x=>x.isRender)as Array<Assignment>;//['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  // ==========================================================

  //avoir la Matiere par assignment assignment





}
