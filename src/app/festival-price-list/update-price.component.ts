import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Price } from './price';
import { PriceService } from './price.service';

interface DialogData {
    success: boolean;
    price: Price;
}

@Component({
    selector: 'app-price-update',
    templateUrl: './update-price.component.html',
    providers: [PriceService],
    styleUrls: ['./update-price.component.css']
})
export class UpdatePriceComponentDialog implements OnInit {
    confirmForm = new FormGroup({
        label: new FormControl(this.data.price.label, [Validators.required]),
        tableCount: new FormControl(this.data.price.tableCount, [Validators.required, Validators.min(0)]),
        m2Count: new FormControl(this.data.price.m2Count, [Validators.required, Validators.min(0)]),
        tablePrice: new FormControl(this.data.price.tablePrice, [Validators.required, Validators.min(0)]),
        m2Price: new FormControl(this.data.price.m2Price, [Validators.required, Validators.min(0)])
    });

    get label() {
        return this.confirmForm.value.label;
    }

    get tableCount() {
        return this.confirmForm.value.tableCount;
    }

    get m2Count() {
        return this.confirmForm.value.m2Count;
    }

    get tablePrice() {
        return this.confirmForm.value.tablePrice;
    }

    get m2Price() {
        return this.confirmForm.value.m2Price;
    }

    error?: string;

    constructor(
        private priceService: PriceService,
        private dialogRef: MatDialogRef<UpdatePriceComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    ngOnInit() {
    }

    updatePrice() {
        this.error = undefined;

        this.priceService.updatePrice(
            this.data.price.id,
            this.label,
            this.tableCount,
            this.m2Count,
            this.m2Price,
            this.tablePrice
        ).subscribe(
            () => {
                this.data.success = true;
                this.dialogRef.close(this.data.success);
            },
            (e: HttpErrorResponse) => {
                this.error = 'Impossible de mettre à jour le prix.';
            }
        );
    }
}
