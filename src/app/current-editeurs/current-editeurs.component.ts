import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Editeur } from '../editeurs/editeur';
import { Game } from '../game-list/game';
import { Contact } from '../contacts/contact';
import {MatTableDataSource} from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentEditeursService } from './current-editeurs.service';

export interface EditeurId{
  id: number;
}

@Component({
  selector: 'app-current-editeurs',
  templateUrl: './current-editeurs.component.html',
  styleUrls: ['./current-editeurs.component.css']
})
export class CurrentEditeursComponent implements OnInit {

  editeurs: Editeur[] = [];

  constructor(public dialog: MatDialog, private editeursService: CurrentEditeursService) { }

  ngOnInit(): void {
    this.getEditeurs();
  }

  getEditeurs(): void {
    this.editeursService.getEditeurs().subscribe(editeur => {this.editeurs = editeur; });
    this.editeurs.sort(function compare(a, b) {
      return a.name.localeCompare(b.name)
    });
  }

  openGamesDialog(id: number) : void {
    const dialogRef = this.dialog.open(CurrentEditeurGamesComponentDialog,
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
  selector: 'app-current-editeurs-games',
  templateUrl: './current-games-editeur.html',
  styleUrls: ['./current-games-editeur.css'],
})
export class CurrentEditeurGamesComponentDialog implements OnInit{

  games: Game[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<CurrentEditeurGamesComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditeurId,
    private currentEditeursService: CurrentEditeursService)
     {}

    ngOnInit(){
      this.getGames(this.data.id);
    }

    getGames(id: number): void {
      this.currentEditeursService.getGamesForEditeur(id).subscribe(game => {this.games = game; });
    }

}



