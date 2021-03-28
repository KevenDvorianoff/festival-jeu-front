import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Game } from './game';
import { GameService } from './game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  providers: [GameService],
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit, AfterViewInit {

  columns: string[] = ['name', 'publisherName', 'minPlayers', 'minAge', 'duration', 'gameType', 'notice', 'isPrototype', 'lastModification', "icons"]
  games = new MatTableDataSource<Game>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.getGames();
  }

  ngAfterViewInit() {
    this.games.sort = this.sort;
    this.games.paginator = this.paginator;
  }

  getGames(): void {
    this.gameService.getGames().subscribe(games => this.games.data = games)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.games.filter = filterValue.trim().toLowerCase();

    if (this.games.paginator) {
      this.games.paginator.firstPage();
    }
  }

}