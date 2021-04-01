import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriceService } from '../festival-price-list/price.service';
import { FestivalService } from './festival.service';

interface DialogData {
    success: boolean;
}

@Component({
    selector: 'app-festival-add',
    templateUrl: './add-festival.component.html',
    providers: [FestivalService, PriceService],
    styleUrls: ['./add-festival.component.css']
})
export class AddFestivalComponentDialog implements OnInit {
    confirmForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        labelZone1: new FormControl('', [Validators.required]),
        labelZone2: new FormControl('', [Validators.required]),
        labelZone3: new FormControl('', [Validators.required]),
    });

    get name() {
        return this.confirmForm.value.name;
    }

    get date() {
        return this.confirmForm.value.date;
    }

    get labelZone1() {
        return this.confirmForm.value.labelZone1;
    }

    get labelZone2() {
        return this.confirmForm.value.labelZone2;
    }

    get labelZone3() {
        return this.confirmForm.value.labelZone3;
    }

    error?: string;

    constructor(
        private festivalService: FestivalService,
        private priceService: PriceService,
        private dialogRef: MatDialogRef<AddFestivalComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    ngOnInit() {

    }

    createFestival() {
        this.error = undefined;

        this.festivalService.createFestival(
            this.name,
            this.date
        ).subscribe(
            (value) => {
                this.priceService.createPrice(this.labelZone1, value.id).subscribe(() => {});
                this.priceService.createPrice(this.labelZone2, value.id).subscribe(() => {});
                this.priceService.createPrice(this.labelZone3, value.id).subscribe(() => {});
                this.data.success = true;
                this.dialogRef.close(this.data.success);
            },
            (e: HttpErrorResponse) => {
                this.error = 'Impossible de créer le festival.';
            }
        );
    }
}
