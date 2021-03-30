import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Editeur } from '../editeurs/editeur';
import { EditeursService } from '../editeurs/editeurs.services';
import { GameType } from './game';
import { GameService } from './game.service';

interface DialogData {
    success: boolean;
}

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
        isPrototype: new FormControl(false, [Validators.required]),
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
    filteredGameTypes!: Observable<string[]>;

    error?: string;

    constructor(
        private gameService: GameService,
        private editeurService: EditeursService,
        private dialogRef: MatDialogRef<AddGameComponentDialog>,
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
        ).subscribe(
            () => {
                this.data.success = true,
                this.dialogRef.close(this.data.success);
            },
            (e: HttpErrorResponse) => {
                this.error = 'Impossible de créer le jeu.';
            }
        );
    }
}
