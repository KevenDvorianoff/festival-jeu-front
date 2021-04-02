import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Editeur } from '../editeurs/editeur';
import { Festival } from '../list-festival/festival';
import { ReservationService } from '../reservation/reservation.service';
import { EditeursService } from '../editeurs/editeurs.services';
import { MatDialogRef } from '@angular/material/dialog';
import { AddReservationComponentDialog } from '../reservation/reservation.component';
import { FestivalService } from '../list-festival/festival.service';
import { ZonesService } from './zones.service';
interface DialogData {
  success: boolean;
}

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.css']
})
export class AddZoneComponentDialog implements OnInit {
  confirmForm = new FormGroup({
    label: new FormControl('', [Validators.required]),
});

get label() {
    return this.confirmForm.value.label;
}

festivals: Festival[] = [];

constructor(
    private zoneService: ZonesService,
    private dialogRef: MatDialogRef<AddReservationComponentDialog>,
    private festivalService: FestivalService
) { 
}

ngOnInit() {
    this.festivalService.getCurrent().subscribe(festival => this.festivals = festival)
}


addZone() {

    this.zoneService.addZone(
        this.label,
        this.festivals[0].id

    ).subscribe(
        () => {
            this.dialogRef.close(true);
        },
    );
}
}
