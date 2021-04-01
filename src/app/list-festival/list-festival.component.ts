import { Component, OnInit } from '@angular/core';
import { FestivalService } from './festival.service';
import { Festival } from './festival';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddFestivalComponentDialog } from './add-festival.component';
import { UpdateFestivalComponentDialog } from './update-festival.component';

@Component({
  selector: 'app-festivals',
  templateUrl: './list-festival.component.html',
  providers: [FestivalService],
  styleUrls: ['./list-festival.component.css']
})
export class ListFestivalComponent implements OnInit {

  festivals!: Festival[];
  success: boolean = true;

  constructor(
    private festivalService: FestivalService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getFestivals();
  }
  
  getFestivals(): void {
    this.festivalService.getFestivals().subscribe(festivals => { this.festivals = festivals; });
    this.festivals.sort(function compare(a, b) {
      return a.date < b.date ? 1 : 0;
    });
  }

  openAddFestivalDialog() {
    const dialogRef = this.dialog.open(AddFestivalComponentDialog, {
      data: {success: this.success}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFestivals();
      this.success = result;
      if (this.success) {this.openSnackBar("Jeu ajouté !")};
    })
  }

  openUpdateFestivalDialog(festival: Festival) {
    const dialogRef = this.dialog.open(UpdateFestivalComponentDialog, {
      data: {success: this.success, festival: festival}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFestivals();
      this.success = result;
      if (this.success) {this.openSnackBar("Jeu modifié !")};
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

}

