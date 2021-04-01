import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriceService } from '../festival-price-list/price.service';
import { Festival } from './festival';
import { FestivalService } from './festival.service';

interface DialogData {
    success: boolean;
    festival: Festival;
}

@Component({
    selector: 'app-festival-update',
    templateUrl: './update-festival.component.html',
    providers: [FestivalService, PriceService],
    styleUrls: ['./update-festival.component.css']
})
export class UpdateFestivalComponentDialog implements OnInit {
    confirmForm = new FormGroup({
        name: new FormControl(this.data.festival.name, [Validators.required]),
        date: new FormControl(this.data.festival.date, [Validators.required]),
        isActive: new FormControl(this.data.festival.isActive, [Validators.required]),
    });

    get name() {
        return this.confirmForm.value.name;
    }

    get date() {
        return this.confirmForm.value.date;
    }

    get isActive() {
        return this.confirmForm.value.isActive;
    }

    error?: string;

    constructor(
        private festivalService: FestivalService,
        private dialogRef: MatDialogRef<UpdateFestivalComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    ngOnInit() {

    }

    updateFestival() {
        this.error = undefined;

        this.festivalService.updateFestival(
            this.data.festival.id,
            this.name,
            this.date,
            this.isActive
        ).subscribe(
            (value) => {
                this.data.success = true;
                this.dialogRef.close(this.data.success);
            },
            (e: HttpErrorResponse) => {
                this.error = 'Impossible de mettre à jour le festival.';
            }
        );
    }
}
