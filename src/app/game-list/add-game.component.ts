import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editeur } from '../editeurs/editeur';
import { EditeursService } from '../editeurs/editeurs.services';
import { GameService } from './game.service';

@Component({
    selector: 'app-game-add',
    templateUrl: './add-game.component.html',
    providers: [GameService],
    styleUrls: ['./add-game.component.css']
})
export class AddGameComponentDialog implements OnInit {
    confirmForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        notice: new FormControl('', [Validators.required]),
        duration: new FormControl('', [Validators.required]),
        minPlayers: new FormControl('', [Validators.required, Validators.min(0)]),
        maxPlayers: new FormControl('', [Validators.required, Validators.min(0)]),
        minAge: new FormControl('', [Validators.required, Validators.min(0)]),
        maxAge: new FormControl('', [Validators.required, Validators.min(0)]),
        isPrototype: new FormControl('', [Validators.required]),
        publisherId: new FormControl('', [Validators.required]),
        gameType: new FormControl('', [Validators.required])
    });

    get name() {
        return this.confirmForm.value.name;
    }

    get notice() {
        return this.confirmForm.value.notice;
    }

    get duration() {
        return this.confirmForm.value.duration;
    }

    get minPlayers() {
        return this.confirmForm.value.minPlayers;
    }

    get maxPlayers() {
        return this.confirmForm.value.maxPlayers;
    }

    get minAge() {
        return this.confirmForm.value.minAge;
    }

    get maxAge() {
        return this.confirmForm.value.maxAge;
    }

    get isPrototype() {
        return this.confirmForm.value.isPrototype;
    }

    get publisherId() {
        return this.confirmForm.value.publisherId;
    }

    get gameType() {
        return this.confirmForm.value.gameType;
    }

    editeurs: Editeur[] = [];
    gameTypes: string[] = [];

    error?: string;

    constructor(
        private gameService: GameService,
        private editeurService: EditeursService
    ) {}

    ngOnInit() {
        this.editeurService.getEditeurs().subscribe(editeurs => this.editeurs = editeurs);
        this.gameService.getGameTypes().subscribe(gameTypes => this.gameTypes = gameTypes);
    }

    createGame() {
        this.error = undefined;

        const lastModification = new Date();

        this.gameService.createGame(
            this.name,
            this.notice,
            this.duration,
            this.minPlayers,
            this.maxPlayers,
            this.minAge,
            this.maxAge,
            this.isPrototype,
            lastModification,
            this.publisherId,
            this.gameType
        )
        .subscribe(
            () => {},
            (e: HttpErrorResponse) => {
                if (e.status === 400) {
                    this.error = 'L\'éditeur indiqué n\'existe pas.';
                }
                else {
                    this.error = 'Impossible de créer le jeu.';
                }
            }
        );
    }
}
