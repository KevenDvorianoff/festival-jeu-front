import { Component, OnInit, Inject } from '@angular/core';
import { Organisator } from './organisator';
import { OrganisatorService } from './organisator.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-organisator-list',
  templateUrl: './organisator-list.component.html',
  providers: [OrganisatorService],
  styleUrls: ['./organisator-list.component.css']
})
export class OrganisatorListComponent implements OnInit {
  organisators: Organisator[] = [];
  editUser: Organisator | undefined;
  username = '';
  password = '';
  isAdmin = false;


  constructor(private organisatorService: OrganisatorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOrganisators();
  }
  getOrganisators(): void {
    this.organisatorService.getOrganisators().subscribe(organisators => {this.organisators = organisators; });
  }
  addUser(username: string): void {
    this.editUser = undefined;
    username = username.trim();
    if (!username) {
      return;
    }
    const newUser: Organisator = {username} as Organisator;
    this.organisatorService.addUser(newUser).subscribe(user => this.organisators.push(user));
  }
  openDialog() {
    const dialogRef = this.dialog.open(OrganisatorsComponentDialog, {
      width: '60%',
      data : {username: this.username,
        password: this.password,
        isAdmin: this.isAdmin}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.username = result;
      this.password = result;
      this.isAdmin = result;
    });
  }
  openDialog2() {
    const dialogRef = this.dialog.open(OrganisatorsComponentDialog, {
      width: '60%',
      data : {username: this.username,
        password: this.password,
        isAdmin: this.isAdmin}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.username = result;
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
