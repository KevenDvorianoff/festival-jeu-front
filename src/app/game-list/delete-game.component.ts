import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from './game.service';

interface DialogData {
  success: boolean;
  gameName: string;
  gameId: number;
}

@Component({
  selector: 'app-delete-game',
  templateUrl: './delete-game.component.html',
  providers: [GameService],
  styleUrls: ['./delete-game.component.css']
})
export class DeleteGameComponentDialog implements OnInit {

  error?: string;

  constructor(
    private gameService: GameService,
    private dialogRef: MatDialogRef<DeleteGameComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  deleteGame() {
    this.error = undefined;

    this.gameService.deleteGame(this.data.gameId).subscribe(
      () => {
        this.data.success = true,
        this.dialogRef.close(this.data.success);
      },
      (e: HttpErrorResponse) => {
        this.error = 'Impossible de supprimer le jeu.';
      }
    )
  }

}
