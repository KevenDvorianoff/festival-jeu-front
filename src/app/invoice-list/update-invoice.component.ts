import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from './invoice';
import { InvoiceService } from './invoice.service';

interface DialogData {
    success: boolean;
    invoice: Invoice;
}

@Component({
    selector: 'app-invoice-update',
    templateUrl: './update-invoice.component.html',
    providers: [InvoiceService],
    styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponentDialog implements OnInit {
    confirmForm = new FormGroup({
        price: new FormControl(this.data.invoice.price, [Validators.required, Validators.min(0)]),
        discount: new FormControl(this.data.invoice.discount, [Validators.required, Validators.min(0)]),
        sentDate: new FormControl(this.data.invoice.sentDate, [Validators.required]),
        paymentDate: new FormControl(this.data.invoice.paymentDate, [Validators.required]),
    });

    get price() {
        return this.confirmForm.value.price;
    }

    get discount() {
        return this.confirmForm.value.discount;
    }

    get sentDate() {
        return this.confirmForm.value.sentDate;
    }

    get paymentDate() {
        return this.confirmForm.value.paymentDate;
    }

    error?: string;

    constructor(
        private invoiceService: InvoiceService,
        private dialogRef: MatDialogRef<UpdateInvoiceComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    ngOnInit() {
    }

    updateInvoice() {
        this.error = undefined;

        this.invoiceService.updateInvoice(
            this.data.invoice.id,
            this.price,
            this.discount,
            this.sentDate,
            this.paymentDate
        ).subscribe(
            () => {
                this.data.success = true;
                this.dialogRef.close(this.data.success);
            },
            (e: HttpErrorResponse) => {
                this.error = 'Impossible de mettre à jour la facture.';
            }
        );
    }
}
