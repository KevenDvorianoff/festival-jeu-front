import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Editeur } from '../editeurs/editeur';
import { EditeursService } from '../editeurs/editeurs.services';
import { Game, GameType } from './game';
import { GameService } from './game.service';

interface DialogData {
    success: boolean;
    game: Game
}

@Component({
    selector: 'app-game-update',
    templateUrl: './update-game.component.html',
    providers: [GameService],
    styleUrls: ['./update-game.component.css']
})
export class UpdateGameComponentDialog implements OnInit {
    confirmForm = new FormGroup({
        name: new FormControl(this.data.game.name, [Validators.required]),
        notice: new FormControl(this.data.game.notice, [Validators.required]),
        duration: new FormControl(this.data.game.duration, [Validators.required]),
        minPlayers: new FormControl(this.data.game.minPlayers, [Validators.required, Validators.min(0)]),
        maxPlayers: new FormControl(this.data.game.maxPlayers, [Validators.required, Validators.min(0)]),
        minAge: new FormControl(this.data.game.minAge, [Validators.required, Validators.min(0)]),
        maxAge: new FormControl(this.data.game.maxAge, [Validators.required, Validators.min(0)]),
        isPrototype: new FormControl(this.data.game.isPrototype, [Validators.required]),
        publisherId: new FormControl(this.data.game.publisherId, [Validators.required]),
        gameType: new FormControl(this.data.game.gameType, [Validators.required])
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
    filteredGameTypes!: Observable<string[]>;

    error?: string;

    constructor(
        private gameService: GameService,
        private editeurService: EditeursService,
        private dialogRef: MatDialogRef<UpdateGameComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    ngOnInit() {
        this.editeurService.getEditeurs().subscribe(editeurs => this.editeurs = editeurs);

        this.filteredGameTypes = combineLatest([
            this.gameService.getGameTypes(),
            this.confirmForm.get('gameType')!.valueChanges.pipe(startWith(''))
        ]).pipe(
            map(value => this._filter(value))
        );
    }

    private _filter(value: [GameType[], string]): string[] {
        const [gameTypes, userValue] = value
        const filterValue = userValue.toLowerCase();

        return gameTypes.map(gT => gT.gameType).filter(gameType => gameType.toLowerCase().includes(filterValue));
    }

    updateGame() {
        this.error = undefined;

        const lastModification = new Date();

        this.gameService.updateGame(
            this.data.game.id,
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
        ).subscribe(
            () => {
                this.data.success = true;
                this.dialogRef.close(this.data.success);
            },
            (e: HttpErrorResponse) => {
                this.error = 'Impossible de mettre à jour le jeu.';
            }
        );
    }
}
