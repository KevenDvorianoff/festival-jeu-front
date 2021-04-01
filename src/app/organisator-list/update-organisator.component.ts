import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { OrganisatorService } from './organisator.service';
import { User } from './organisator';

interface DialogData {
    success: boolean;
    user: User
}

@Component({
    selector: 'app-organisator-update',
    templateUrl: './update-organisator.component.html',
    providers: [OrganisatorService],
    styleUrls: ['./update-organisator.component.css']
})
export class UpdateOrganisatorComponentDialog  implements OnInit  {
    confirmForm = new FormGroup({
        username: new FormControl(this.data.user.username, [Validators.required]),
        password: new FormControl(this.data.user.password, [Validators.required]),
        isAdmin: new FormControl(this.data.user.isAdmin, [Validators.required])
    })
    

    get username() {
        return this.confirmForm.value.username;
    }

    get password() {
        return this.confirmForm.value.password;
    }

    get isAdmin() {
        return this.confirmForm.value.isAdmin;
    }


    error?: string;

    constructor(
        private organisatorService: OrganisatorService,
        private dialogRef: MatDialogRef<UpdateOrganisatorComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }
    ngOnInit() {
    
    }
    
    updateOrganisator() {
        this.error = undefined;

        const lastModification = new Date();

        this.organisatorService.updateOrganisator(
            this.data.user.id,
            this.username,
            this.password,
            this.isAdmin,
            
        ).subscribe(
            () => {
                this.data.success = true;
                this.dialogRef.close(this.data.success);
            },
            (e: HttpErrorResponse) => {
                this.error = 'Impossible de mettre à jour l organisateur.';
            }
        );
    }
}
