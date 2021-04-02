import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservationService} from './reservation.service';
import { Reservation } from './reservation';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Editeur } from '../editeurs/editeur';
import { EditeursService } from '../editeurs/editeurs.services';

export interface DialogData{
  resName: string,
  resId: number
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservations = new MatTableDataSource<Reservation>([]);

  columns = ['Editeur/Exposant', 'Présent','Placé','Besoin de volontaires',"icons"]

  constructor(private reservationService: ReservationService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService.getReservations().subscribe(reservations => {this.reservations.data = reservations;});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.reservations.filter = filterValue.trim().toLowerCase();
  }

  openDeleteDialog(reservation: Reservation){
    const dialogRef = this.dialog.open(DeleteReservationComponentDialog, {
      data: {resName: reservation.companyName, resId: reservation.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getReservations();
      if (result) {this.openSnackBar("Reservation supprimé !")};
    })
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddReservationComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.getReservations();
      if (result) {this.openSnackBar("Reservation ajoutée !")};
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

}

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.html',
  providers: [ReservationService],
  styleUrls: ['./delete-reservation.css']
})
export class DeleteReservationComponentDialog implements OnInit {

  error?: string;

  constructor(
    private reseService: ReservationService,
    private dialogRef: MatDialogRef<DeleteReservationComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  deleteReservation() {
    this.error = undefined;

    this.reseService.deleteReservation(this.data.resId).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      (e: HttpErrorResponse) => {
        this.error = 'Impossible de supprimer la reservation.';
      }
    )
  }

}


@Component({
    selector: 'app-reservation-add',
    templateUrl: './add-reservation.html',
    providers: [ReservationService],
    styleUrls: ['./add-reservation.css']
})
export class AddReservationComponentDialog implements OnInit {


    confirmForm = new FormGroup({
        companyId: new FormControl('', [Validators.required]),
        isPlaced: new FormControl(false, [Validators.required]),
        isPresent: new FormControl(false, [Validators.required]),
        needVolunteers: new FormControl(false, [Validators.required])
    });

    get companyId() {
        return this.confirmForm.value.companyId;
    }

    get isPlaced() {
        return this.confirmForm.value.isPlaced;
    }

    get isPresent() {
        return this.confirmForm.value.isPresent;
    }

    get needVolunteers() {
        return this.confirmForm.value.needVolunteers;
    }



    editeurs: Editeur[] = [];

    constructor(
        private reseService: ReservationService,
        private editeurService: EditeursService,
        private dialogRef: MatDialogRef<AddReservationComponentDialog>
    ) { 
    }

    ngOnInit() {
        this.editeurService.getEditeurs().subscribe(editeurs => this.editeurs = editeurs);
    }

    date = new Date()

    addReservation() {

        this.reseService.createReservation(
            this.companyId,
            this.isPlaced,
            this.isPresent,
            this.needVolunteers,
            this.date

        ).subscribe(
            () => {
                this.dialogRef.close(true);
            },
        );
    }
}

