import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { EditeursService } from './editeurs.services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Editeur } from './editeur';
import { Game } from '../game-list/game';
import { Contact } from '../contacts/contact';
import {MatTableDataSource} from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';


export interface EditeurId{
  id: number;
  isPublisher: boolean;
  isExhibitor: boolean;
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
    this.editeursService.getEditeurs().subscribe(editeur => {this.editeurs = editeur; });
  }



  constructor(public dialog: MatDialog, private editeursService: EditeursService) {}


  openAddDialog(): void {
    const dialogRef = this.dialog.open(EditeursAddComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openGamesDialog(id: number, isPublisher: boolean, isExhibitor: boolean) : void {
    const dialogRef = this.dialog.open(EditeurGamesComponentDialog,
      {
        width: '40%',
        height: '50%',
        data : {id,isPublisher,isExhibitor}});

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
export class EditeursAddComponentDialog{

  confirmForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    isPublisher: new FormControl(false, [Validators.required]),
    isExhibitor: new FormControl(false, [Validators.required]),
    isActive: new FormControl(false, [Validators.required])
});
get name() {
  return this.confirmForm.value.name;
}
get address() {
  return this.confirmForm.value.address;
}
get isPublisher() {
  return this.confirmForm.value.isPublisher;
}
get isExhibitor() {
  return this.confirmForm.value.isExhibitor;
}
get isActive() {
  return this.confirmForm.value.isActive;
}

constructor(
  private editeurService: EditeursService,
  public dialogRef: MatDialogRef<EditeursAddComponentDialog>
) { 
}

addEditeur() {

  this.editeurService.addEditeur(
      this.name,
      this.address,
      this.isActive,
      this.isExhibitor,
      this.isPublisher
  ).subscribe(
    () => {}
  );

  if(this.name != '' && this.address != ''){
    console.log(this.name)
    this.dialogRef.close()
  }
}

}



@Component({
  selector: 'app-editeurs-games',
  templateUrl: './games-editeur.html',
  styleUrls: ['./games-editeur.css'],
})
export class EditeurGamesComponentDialog implements OnInit{

  games: Game[] = [];
  contacts: Contact[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<EditeurGamesComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditeurId,
    private editeursService: EditeursService)
     {}

    ngOnInit(){
      this.getGames(this.data.id);
      this.getContect(this.data.id);
    }

    getGames(id: number): void {
      this.editeursService.getGamesForEditeur(id).subscribe(game => {this.games = game; });
    }
    getContect(id: number): void {
      this.editeursService.getContactForCompany(id).subscribe(contact => {this.contacts = contact; });
    }

}

