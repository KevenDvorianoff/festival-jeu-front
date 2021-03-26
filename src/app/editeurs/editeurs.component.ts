import { Component, OnInit, Inject } from '@angular/core';
import { ConfigService } from './editeurs.services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

export interface EditeurData{
  name: string;
  address: string;
  isPublisher: boolean;
  isExhibitor: boolean;
  isActive: boolean;
  
}
@Component({
  selector: 'app-editeurs',
  templateUrl: './editeurs.component.html',
  styleUrls: ['./editeurs.component.css']
})
export class EditeursComponent {

  name!: string;
  address!: string;
  isPublisher = false;
  isExhibitor = false ;
  isActive = false;
  


  constructor(public dialog: MatDialog) {}

  openDialog() : void {
    const dialogRef = this.dialog.open(EditeursComponentDialog, {
      width: '60%',
      data : {name: this.name, 
        address: this.address, 
        isPublisher: this.isPublisher, 
        isExhibitor: this.isExhibitor, 
        isActive: this.isActive}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.name = result.name;
      this.address = result.address;
      this.isPublisher = result.isPublisher;
      this.isExhibitor = result.isExhibitor;
      this.isActive = result.isActive;
    });
  }
}

@Component({
  selector: 'app-editeurs-add',
  templateUrl: './add-editeur.html',
  styleUrls: ['./add-editeur.css']
})
export class EditeursComponentDialog {

  constructor(
    public dialogRef: MatDialogRef<EditeursComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditeurData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}