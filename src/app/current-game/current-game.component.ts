import { Component, OnInit } from '@angular/core';
import { CurrentGameService } from './current-game.service';
import { Game } from '../game-list/game';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.css']
})
export class CurrentGameComponent implements OnInit {
  games: Game[] = [];

  constructor(private currentGameService: CurrentGameService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.currentGameService.getGames().subscribe(games => {this.games = games;});
  }

}
