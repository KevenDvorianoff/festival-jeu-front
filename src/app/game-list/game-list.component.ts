import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddGameComponentDialog } from './add-game.component';
import { DeleteGameComponentDialog } from './delete-game.component';
import { Game } from './game';
import { GameService } from './game.service';
import { UpdateGameComponentDialog } from './update-game.component';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  providers: [GameService],
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit, AfterViewInit {

  columns: string[] = ['name', 'publisherName', 'minPlayers', 'minAge', 'duration', 'gameType', 'notice', 'isPrototype', 'lastModification', 'icons'];
  games = new MatTableDataSource<Game>([]);
  success: boolean = true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private gameService: GameService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getGames();
  }

  ngAfterViewInit() {
    this.games.sort = this.sort;
    this.games.paginator = this.paginator;
  }

  getGames(): void {
    this.gameService.getGames().subscribe(games => {
      this.games.data = games;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.games.filter = filterValue.trim().toLowerCase();

    if (this.games.paginator) {
      this.games.paginator.firstPage();
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddGameComponentDialog, {
      data: {success: this.success}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getGames();
      this.success = result;
      if (this.success) {this.openSnackBar("Jeu ajouté !")};
    })
  }

  openDeleteDialog(game: Game): void {
    const dialogRef = this.dialog.open(DeleteGameComponentDialog, {
      data: {success: this.success, gameName: game.name, gameId: game.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getGames();
      this.success = result;
      if (this.success) {this.openSnackBar("Jeu supprimé !")};
    })
  }

  openUpdateDialog(game: Game): void {
    const dialogRef = this.dialog.open(UpdateGameComponentDialog, {
      data: {success: this.success, game: game}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getGames();
      this.success = result;
      if (this.success) {this.openSnackBar("Jeu modifié !")};
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

}
