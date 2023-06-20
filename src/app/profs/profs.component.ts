import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-profs',
  templateUrl: './profs.component.html',
  styleUrls: ['./profs.component.css']
})
export class ProfsComponent {
  data = [
    { photo: '1', name: 'Johan Teach', email: 'tjohan@gmail.com', subject: 'Angular' },
    { photo: '2', name: 'Johan Teach', email: 'tjohan@gmail.com', subject: 'Big Data' },
    { photo: '3', name: 'Johan Teach', email: 'tjohan@gmail.com', subject: 'Grails' },
    { photo: '4', name: 'Onja Teach', email: 'tonja@gmail.com', subject: 'Jakarta' }
  ];
  displayedColumns: string[] = ['photo', 'name', 'email', 'subject'];
  dataSource = new MatTableDataSource(this.data);
}