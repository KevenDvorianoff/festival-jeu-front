import { Component, OnInit, Inject } from '@angular/core';
import { EditeursService } from './editeurs.services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Editeur } from './editeur';
import { Game } from '../game-list/game';

export interface EditeurId{
  id: number;
}

@Component({
  selector: 'app-editeurs',
  templateUrl: './editeurs.component.html',
  styleUrls: ['./editeurs.component.css'],
})
export class EditeursComponent implements OnInit{

  editeurs: Editeur[] = [];

  name!: string;
  address!: string;
  isPublisher = false;
  isExhibitor = false ;
  isActive = false;

  ngOnInit() {
    this.getEditeurs();
  }

  getEditeurs(): void {
    this.editeursService.getEditeurs().subscribe(editeur => {this.editeurs = editeur})
  }
  


  constructor(public dialog: MatDialog, private editeursService: EditeursService) {}

  
  openAddDialog() : void {
    const dialogRef = this.dialog.open(EditeursAddComponentDialog, {
      width: '60%',
      data : {name: this.name, 
        address: this.address, 
        isPublisher: this.isPublisher, 
        isExhibitor: this.isExhibitor, 
        isActive: this.isActive}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.editeurs.push(result.editeur)
    });
  }

  openGamesDialog(id: number) : void {
    const dialogRef = this.dialog.open(EditeurGamesComponentDialog,
      {data : {id: id}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-editeurs-add',
  templateUrl: './add-editeur.html',
  styleUrls: ['./add-editeur.css']
})
export class EditeursAddComponentDialog {

  editeur: Editeur | undefined

  constructor(
    public dialogRef: MatDialogRef<EditeursAddComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Editeur,
    private editeursService: EditeursService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addEditeur(name: string, adresse: string): void {
    this.editeur = undefined;
    name = name.trim();
    if(!name) {
      return;
    }

    var newEditeur: Editeur = { name } as Editeur;
    newEditeur.name = name;
    newEditeur.address = adresse;

    this.editeursService.addEditeur(newEditeur).subscribe(editeur => editeur);
  }

}

@Component({
  selector: 'app-editeurs-games',
  templateUrl: './games-editeur.html',
  styleUrls: ['./games-editeur.css']
})
export class EditeurGamesComponentDialog implements OnInit{


  games: Game[] = [];



  constructor(
    public dialogRef: MatDialogRef<EditeurGamesComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditeurId,
    private editeursService: EditeursService)
     {}

    ngOnInit(){
      this.getGames(this.data.id)
    }

    getGames(id: number): void {
      this.editeursService.getGamesForEditeur(id).subscribe(game => {this.games = game});
    }

}

