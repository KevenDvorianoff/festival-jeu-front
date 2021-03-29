import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation';

export interface ReservationId{
  id: number;
}
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservations: Reservation[] = [];
  constructor(public dialog: MatDialog, private reservationService: ReservationService) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService.getReservations().subscribe(reservations => {this.reservations = reservations;});
  }

  openGamesDialog(id: number): void {
    const dialogRef = this.dialog.open(ReservationsInfosComponentDialog,
      {data : {id}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-reservation-info',
  templateUrl: './reservation-info.html',
  styleUrls: ['./reservation-info.css']
})
export class ReservationsInfosComponentDialog implements OnInit{


  resa: Reservation[] = [];



  constructor(
    public dialogRef: MatDialogRef<ReservationsInfosComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ReservationId,
    private reservationService: ReservationService)
     {}

    ngOnInit(){
      this.getGames(this.data.id);
    }

    getGames(id: number): void {
      this.reservationService.getReservations().subscribe(reservation => {this.resa = reservation;});
    }
  }
