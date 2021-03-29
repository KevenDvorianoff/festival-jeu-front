import { Component, OnInit, Inject } from '@angular/core';
import { ListFestivalService } from './list-festival.service';
import { Festival } from './festival';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface Fest {
  name: string;
  date: string;
  isActive: boolean;
}

@Component({
  selector: 'app-festivals',
  templateUrl: './list-festival.component.html',
  providers: [ ListFestivalService ],
  styleUrls: ['./list-festival.component.css']
})
export class ListFestivalComponent implements OnInit{
  error: any;
  headers: string[] | undefined;
  festivals: Festival[] = [];
  editFestival: Festival | undefined;
  name = '';
  date = '';
  isActive = false;


  constructor(private listfestivalservice: ListFestivalService, public dialog: MatDialog ) { }
  ngOnInit(){
    this.getFestivals();
  }
  openDialog() {
    const dialogRef = this.dialog.open(FestivalsComponentDialog, {
      width: '60%',
      data : {name: this.name,
        date: this.date,
        isActive: this.isActive}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.name = result;
      this.date = result;
      this.isActive = result;
    });
  }

  getFestivals(): void {
    this.listfestivalservice.getFestivals().subscribe(festivals => {this.festivals = festivals; });
  }
  addFestivals(name: string): void {
    this.editFestival = undefined;
    name = name.trim();
    if (!name) {
      return;
    }
    const newFestival: Festival = {name} as Festival;
    this.listfestivalservice.addFestival(newFestival).subscribe(festival => this.festivals.push(festival));
  }
}

@Component({
  selector: 'app-festival',
  templateUrl: './add-festival.html',
  styleUrls: ['./add-festival.css']
})
export class FestivalsComponentDialog {
  constructor(
    public dialogRef: MatDialogRef<FestivalsComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Festival, private _snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
