import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganisatorService } from './organisator.service';

interface DialogData {
  success: boolean;
  organisatorUsername: string;
  organisatorId: number;
}

@Component({
  selector: 'app-delete-organisator',
  templateUrl: './delete-organisator.component.html',
  providers: [OrganisatorService],
  styleUrls: ['./delete-organisator.component.css']
})
export class DeleteOrganisatorComponentDialog implements OnInit {

  error?: string;

  constructor(
    private organisateurService: OrganisatorService,
    private dialogRef: MatDialogRef<DeleteOrganisatorComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  deleteOrganisator() {
    this.error = undefined;

    this.organisateurService.deleteOrganisator(this.data.organisatorId).subscribe(
      () => {
        this.data.success = true,
        this.dialogRef.close(this.data.success);
      },
      (e: HttpErrorResponse) => {
        this.error = 'Impossible de supprimer lorganisateur.';
      }
    )
  }

}
