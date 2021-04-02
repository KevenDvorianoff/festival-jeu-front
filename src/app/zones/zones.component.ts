import { Component, OnInit, Inject } from '@angular/core';
import { ZonesService } from './zones.service';
import { Zone } from './zone';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from '../game-list/game';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddZoneComponentDialog } from './add-zone.component';

export interface ZoneId{
  id: number;
}
@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {

  zones: Zone[] = [];
  constructor(public dialog: MatDialog, private zonesService: ZonesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getZones();
  }
  getZones(): void {
    this.zonesService.getZones().subscribe(zone => {this.zones = zone; });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddZoneComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.getZones();
      if (result) {this.openSnackBar("Zone ajouté !")};
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

  openGamesDialog(id: number): void {
    const dialogRef = this.dialog.open(ZoneGamesComponentDialog,
      {
        width: '40%',
        height: '50%',
        data : {id}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


@Component({
  selector: 'app-zones-games',
  templateUrl: './games-zone.html',
  styleUrls: ['./games-zone.css']
})
export class ZoneGamesComponentDialog implements OnInit{


  games: Game[] = [];



  constructor(
    public dialogRef: MatDialogRef<ZoneGamesComponentDialog>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ZoneId,
    private zonesService: ZonesService)
     {}

    ngOnInit(){
      this.getGames(this.data.id);
      console.log(this.games.length)
    }

    getGames(id: number): void {
      this.zonesService.getGamesForArea(id).subscribe(game => {this.games = game; });
    }

    openSnackBar(message: string) {
      this.snackBar.open(message, undefined, {
        duration: 2000,
        panelClass: ['snackbar-success']
      });
    }
}
