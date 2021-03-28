import { Component, OnInit, Inject } from '@angular/core';
import { ZonesService } from './zones.service';
import { Zone } from './zone';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from '../game-list/game';

export interface ZoneId{
  id: number;
}
@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {

  zones: Zone[]= [];
  constructor(public dialog: MatDialog, private zonesService: ZonesService) { }

  ngOnInit(): void {
    this.getZones();
  }
  getZones(): void {
    this.zonesService.getZones().subscribe(zone => {this.zones = zone})
  }
  
  openGamesDialog(id: number) : void {
    const dialogRef = this.dialog.open(ZoneGamesComponentDialog,
      {data : {id: id}});

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
    @Inject(MAT_DIALOG_DATA) public data: ZoneId,
    private zonesService: ZonesService)
     {}

    ngOnInit(){
      this.getGames(this.data.id)
    }

    getGames(id: number): void {
      this.zonesService.getGamesForArea(id).subscribe(game => {this.games = game});
    }

}