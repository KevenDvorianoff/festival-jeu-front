import { DateAdapter } from "@angular/material/core";

export interface Game {
    id: number;
    name: string;
    notice: string;
    duration: string;
    minPlayers: number;
    maxPlayers: number;
    minAge: number;
    maxAge: number;
    isPrototype: boolean;
    lastModification: Date;
    publisherName: string;
    gameType: string;
    publisherId: number;
}