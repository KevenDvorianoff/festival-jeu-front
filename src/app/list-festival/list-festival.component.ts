import { Component, OnInit } from '@angular/core';
import { ListFestivalService } from './list-festival.service';
import { Festival } from './festival';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-festivals',
  templateUrl: './list-festival.component.html',
  providers: [ ListFestivalService ],
  styleUrls: ['./list-festival.component.css']
})
export class ListFestivalComponent implements OnInit{
  error: any;
  headers: string[] | undefined;
  festivals: Festival[] =[];
  editFestival: Festival | undefined;


  constructor(private listfestivalservice: ListFestivalService, public dialog: MatDialog ) { }
  ngOnInit(){
    this.getFestivals();
  }
  openDialog() {
    const dialogRef = this.dialog.open(FestivalsComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getFestivals(): void {
    this.listfestivalservice.getFestivals().subscribe(festivals => {this.festivals = festivals})
  }
  addFestivals(name: string): void {
    this.editFestival = undefined;
    name = name.trim();
    if(!name) {
      return;
    }
    const newFestival: Festival = {name} as Festival;
    this.listfestivalservice.addFestival(newFestival).subscribe(festival => this.festivals.push(festival));
  }
}

@Component({
  selector: 'app-festival',
  templateUrl: './add-festival.html',
})
export class FestivalsComponentDialog {}