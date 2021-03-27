import { Component, OnInit, Inject } from '@angular/core';
import { Organisator } from './organisator';
import { OrganisatorService } from './organisator.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';


export interface Account {
  login: string;
  password: string;
  isAdmin: boolean;
}
@Component({
  selector: 'app-organisator-list',
  templateUrl: './organisator-list.component.html',
  providers: [OrganisatorService],
  styleUrls: ['./organisator-list.component.css']
})
export class OrganisatorListComponent implements OnInit {
  organisators: Organisator[] = [];
  editAccount: Organisator | undefined;
  login: string ="";
  password: string ="";
  isAdmin: boolean= false;


  constructor(private organisatorService: OrganisatorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOrganisators();
  }
  getOrganisators(): void {
    this.organisatorService.getOrganisators().subscribe(organisators => {this.organisators = organisators})
  }
  addAccount(login: string): void {
    this.editAccount = undefined;
    login = login.trim();
    if(!login) {
      return;
    }
    const newAccount: Organisator = {login} as Organisator;
    this.organisatorService.addAccount(newAccount).subscribe(account => this.organisators.push(account));
  }
  openDialog() {
    const dialogRef = this.dialog.open(OrganisatorsComponentDialog, {
      width: '60%',
      data : {login: this.login, 
        password: this.password,  
        isAdmin: this.isAdmin}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.login = result;
      this.password = result;
      this.isAdmin = result;
    });
  }
}
@Component({
  selector: 'app-organisateur-add',
  templateUrl: './add-organisator.html',
})
export class OrganisatorsComponentDialog {
  constructor(
    public dialogRef: MatDialogRef<OrganisatorsComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Organisator) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}