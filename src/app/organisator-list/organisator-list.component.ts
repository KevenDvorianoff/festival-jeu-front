import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { User } from './organisator';
import { OrganisatorService } from './organisator.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-organisator-list',
  templateUrl: './organisator-list.component.html',
  providers: [OrganisatorService],
  styleUrls: ['./organisator-list.component.css']
})
export class OrganisatorListComponent implements OnInit, AfterViewInit {
columns: string[] = ['username', 'isAdmin'];
organisateurs = new MatTableDataSource<User>([]);
success: boolean = true;

@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatTable) table!: MatTable<any>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
  organisators: User[] = [];
  editUser: User | undefined;
  username = '';
  password = '';
  isAdmin = false;


  constructor(private organisatorService: OrganisatorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOrganisators();
  }
  ngAfterViewInit() {
    this.organisateurs.sort = this.sort;
    this.organisateurs.paginator = this.paginator;
  }
  getOrganisators(): void {
    this.organisatorService.getOrganisators().subscribe(organisateurs => {this.organisateurs.data = organisateurs;
    this.table.renderRows(); });
  }
  addUser(username: string): void {
    this.editUser = undefined;
    username = username.trim();
    if (!username) {
      return;
    }
    const newUser: User = {username} as User;
    this.organisatorService.addUser(newUser).subscribe(user => this.organisators.push(user));
  }
  deleteOrganisator(organisateur : User): void {
    this.organisatorService
  .deleteOrganisator(organisateur.id)
  .subscribe();
  }
  edit(organisateur: User){
    this.openDialog();
    this.editUser = organisateur;
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
  organisators: User[] = [];
  editUser: User | undefined;
  constructor(private organisatorService: OrganisatorService,
    public dialogRef: MatDialogRef<OrganisatorsComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addUser(username: string): void {
    this.editUser = undefined;
    username = username.trim();
    if (!username) {
      return;
    }
    const newUser: User = {username} as User;
    this.organisatorService.addUser(newUser).subscribe(user => this.organisators.push(user));
  }
 
}
