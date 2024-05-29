import getRandomWord from "../utils/getRandomWord";
import { ClientUserData } from "../../../shared/models/user.model";
import { GameData } from "./../../../shared/models/game.model";

export default class GameService {
	private static games: GameData[] = [];

	private static doGameExists(roomId: string) {
		return this.games.findIndex((game) => game.roomId === roomId) !== -1;
	}

	static getAllGames() {
		return new Promise<GameData[]>((resolve, reject) => {
			if (!this.games) {
				reject(new Error("No games found"));
				return;
			}
			resolve(this.games);
		});
	}

	static createGame({ roomId, userId }: ClientUserData, totalTurns = 5) {
		const newGameData: GameData = {
			roomId,
			host: userId,
			users: [],
			turnOf: "",
			turnIndex: 0,
			currentTurn: 0,
			totalTurns,
			started: false,
			finished: false,
			guessWord: "",
		};

		return new Promise<GameData>((resolve, reject) => {
			if (this.doGameExists(roomId)) {
				reject(new Error(`Game with roomId: ${roomId} is already created`));
				return;
			}

			this.games.push(newGameData);

			resolve(newGameData);
		});
	}

	static joinGame(userData: ClientUserData) {
		return new Promise<GameData>((resolve, reject) => {
			const game = this.games.find((game) => game.roomId === userData.roomId);

			if (!game) {
				reject(new Error(`Game with roomId: ${userData.roomId} not found`));
				return;
			}

			if (game.users.find((user) => user.userId === userData.userId)) {
				reject(new Error(`User with id ${userData.userId} is already in game`));
				return;
			}

			game.users.push({ ...userData, points: 0 });
			resolve(game);
		});
	}

	static leaveGame(userData: ClientUserData) {
		return new Promise<GameData>((resolve, reject) => {
			const game = this.games.find((game) => game.roomId === userData.roomId);
			if (!game) {
				reject(new Error(`Game with roomId: ${userData.roomId} not found`));
				return;
			}

			const userIndex = game.users.findIndex(
				(user) => user.userId === userData.userId
			);
			if (userIndex === -1) {
				reject(new Error(`User with id ${userData.userId} not found in game`));
				return;
			}

			game.users.splice(userIndex, 1);

			//Increase turn when user leave if its his turn
			if (game.turnOf === userData.userId) {
				this.increaseTurn(game);
			}

			resolve(game);
		});
	}

	static deleteGame({ roomId, userId, username }: ClientUserData) {
		return new Promise<GameData[]>((resolve, reject) => {
			const index = this.games.findIndex((game) => game.roomId === roomId);
			if (index === -1) {
				reject(new Error(`Game with roomId: ${roomId} not found`));
				return;
			}

			if (this.games[index].host !== userId) {
				reject(new Error(`User ${username} is not HOST`));
				return;
			}

			const game = this.games.splice(index, 1);
			resolve(game);
		});
	}

	static startGame({ roomId, userId, username }: ClientUserData) {
		return new Promise<GameData>((resolve, reject) => {
			const game = this.games.find((game) => game.roomId === roomId);
			if (!game) {
				reject(new Error(`Game with roomId: ${roomId} not found`));
				return;
			}

			if (game.host !== userId) {
				reject(new Error(`User ${username} is not HOST`));
				return;
			}

			//Start game and select user turn
			game.guessWord = getRandomWord();
			game.started = true;
			game.turnOf = game.users[game.turnIndex].userId;

			resolve(game);
		});
	}

	static finishTurn({ roomId }: ClientUserData) {
		return new Promise<GameData>((resolve, reject) => {
			const game = this.games.find((game) => game.roomId === roomId);
			if (!game) {
				reject(new Error(`Game with roomId: ${roomId} not found`));
				return;
			}

			this.increaseTurn(game);
			resolve(game);
		});
	}

	static checkGuessWord(userData: ClientUserData, userWord: string) {
		return new Promise<GameData>((resolve, reject) => {
			if (!userWord) reject(new Error(`No word provided`));

			const game = this.games.find((game) => game.roomId === userData.roomId);
			if (!game) {
				reject(new Error(`Game with roomId: ${userData.roomId} not found`));
				return;
			}

			const user = game.users.find((user) => user.userId === userData.userId);
			if (!user) {
				reject(new Error(`User with id: ${userData.userId} not found`));
				return;
			}

			if (game.turnOf === user.userId) {
				reject(new Error(`This user is drawing, cant guess`));
				return;
			}

			if (userWord !== game.guessWord) {
				reject(new Error(`Wrong guess word`));
				return;
			}

			console.log(
				`USER ${userData.username} guessed the word ${game.guessWord}`
			);
			this.increaseTurn(game);
			user.points++;

			resolve(game);
		});
	}

	private static increaseTurn(game: GameData) {
		if (!game.started) return;

		if (game.turnIndex >= game.users.length - 1) {
			game.turnIndex = 0;
			if (game.currentTurn >= game.totalTurns) {
				game.finished = true;
			} else {
				game.currentTurn++;
			}
		} else {
			game.turnIndex++;
		}
		game.guessWord = getRandomWord();

		game.turnOf = game.users[game.turnIndex].userId;
	}
}
