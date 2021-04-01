import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Editeur } from '../editeurs/editeur';
import { EditeursService } from '../editeurs/editeurs.services';

import { OrganisatorService } from '../organisator-list/organisator.service';

interface DialogData {
    success: boolean;
}

@Component({
    selector: 'app-organisator-add',
    templateUrl: './add-organisator.component.html',
    providers: [OrganisatorService],
    styleUrls: ['./add-organisator.component.css']
})
export class AddOrganisatorComponentDialog{
    confirmForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        isAdmin: new FormControl(false, [Validators.required]),
        
    });

    get username() {
        return this.confirmForm.value.username;
    }

    get password() {
        return this.confirmForm.value.password;
    }

    get isAdmin() {
        return this.confirmForm.value.isAdmin;
    }

    

   
    editeurs: Editeur[] = [];
    filteredGameTypes!: Observable<string[]>;

    error?: string;

    constructor(
        private organisateurService: OrganisatorService,
       // private editeurService: EditeursService,
        private dialogRef: MatDialogRef<AddOrganisatorComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

   

    createOrganisator() {
        this.error = undefined;

        const lastModification = new Date();

        this.organisateurService.createOrganisator(
            this.username,
            this.password,
            this.isAdmin
            
        ).subscribe(
            () => {
                this.data.success = true;
                this.dialogRef.close(this.data.success);
            },
            (e: HttpErrorResponse) => {
                this.error = 'Impossible de créer l organisateur.';
            }
        );
    }
}
