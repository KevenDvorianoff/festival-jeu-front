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
}