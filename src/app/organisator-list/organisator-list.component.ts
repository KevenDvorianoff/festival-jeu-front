import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { User } from './organisator';
import { OrganisatorService } from './organisator.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateOrganisatorComponentDialog } from './update-organisator.component';
import { AddOrganisatorComponentDialog} from './add-organisator.component';
import { DeleteOrganisatorComponentDialog} from './delete-organisator.component';



@Component({
  selector: 'app-organisator-list',
  templateUrl: './organisator-list.component.html',
  providers: [OrganisatorService],
  styleUrls: ['./organisator-list.component.css']
})
export class OrganisatorListComponent implements OnInit, AfterViewInit {
columns: string[] = ['username', 'isAdmin','icons'];
organisateurs = new MatTableDataSource<User>([]);
success: boolean = true;

@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatTable) table!: MatTable<any>;
@ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private organisatorService: OrganisatorService, public dialog: MatDialog,private snackBar: MatSnackBar) { }

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
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.organisateurs.filter = filterValue.trim().toLowerCase();

    if (this.organisateurs.paginator) {
      this.organisateurs.paginator.firstPage();
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddOrganisatorComponentDialog, {
      data: {success: this.success}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOrganisators();
      this.success = result;
      if (this.success) {this.openSnackBar("Organisateur ajouté !")};
    })
  }

  openDeleteDialog(user: User): void {
    const dialogRef = this.dialog.open(DeleteOrganisatorComponentDialog, {
      data: {success: this.success, organisatorUsername: user.username, organisatorId: user.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOrganisators();
      this.success = result;
      if (this.success) {this.openSnackBar("Organisateur supprimé !")};
    })
  }

  openUpdateDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateOrganisatorComponentDialog, {
      data: {success: this.success, user: user}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOrganisators();
      this.success = result;
      if (this.success) {this.openSnackBar("Organisateur modifié !")};
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

}

