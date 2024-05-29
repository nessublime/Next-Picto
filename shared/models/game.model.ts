import { ClientUserData } from "./user.model";

export interface UserGameData extends ClientUserData {
	points: number;
}

export interface GameData {
	roomId: string;
	host: string;
	users: UserGameData[];
	turnOf: string;
	turnIndex: number;
	currentTurn: number;
	totalTurns: number;
	started: boolean;
	finished: boolean;
	guessWord?: string;
}

export interface TimerData {
	timerValue: number;
}
