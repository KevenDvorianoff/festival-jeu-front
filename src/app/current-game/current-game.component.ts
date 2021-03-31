import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { CurrentGameService } from './current-game.service';
import { ReservedGame } from './reserved-game';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  providers: [CurrentGameService],
  styleUrls: ['./current-game.component.css']
})
export class CurrentGameComponent implements OnInit, AfterViewInit {

  columns: string[] = ['name', 'publisherName', 'exhibitorName', 'minPlayers', 'minAge', 'duration', 'gameType', 'notice', 'isPrototype', 'area'];
  games = new MatTableDataSource<ReservedGame>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private currentGameService: CurrentGameService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.getGames();
    if (this.authService.connectionState.value === 'connected') {
      this.columns = ['name', 'publisherName', 'exhibitorName', 'minPlayers', 'minAge', 'duration', 'gameType', 'notice', 'isPrototype', 'area', 'quantity', 'table', 'received', 'lastModification'];
    }
  }

  ngAfterViewInit() {
    this.games.sort = this.sort;
    this.games.paginator = this.paginator;
  }

  getGames(): void {
    this.currentGameService.getGames().subscribe(games => {this.games.data = games;});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.games.filter = filterValue.trim().toLowerCase();

    if (this.games.paginator) {
      this.games.paginator.firstPage();
    }
  }

  getQuantity(game: ReservedGame) {
    return game.exposed + game.donation + game.tombola;
  }

  isReceived(game: ReservedGame) {
    return game.receiveDate !== null;
  }

  getAreaName(game: ReservedGame) {
    console.log(game.areaName)
    if (game.areaName !== null) {
      return game.areaName;
    }
    return 'Autre';
  }

}
