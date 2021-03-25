import { Component, OnInit } from '@angular/core';
import { ConfigService } from './editeurs.services';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-editeurs',
  templateUrl: './editeurs.component.html',
  styleUrls: ['./editeurs.component.css']
})
export class EditeursComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(EditeursComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-editeurs',
  templateUrl: './add-editeur.html',
})
export class EditeursComponentDialog {}