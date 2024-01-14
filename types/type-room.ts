import { IPlayer } from "./type-player";

export interface IRoom {
    id: string;
    name: string;
    totalPlayer: number;
    players: Array<IPlayer>;
    createdBy: string;
}
