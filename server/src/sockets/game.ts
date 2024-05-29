import { Socket } from "socket.io";
import { GameMsg } from "../../../shared/messages/game.message";
import { ClientUserData } from "../../../shared/models/user.model";
import { SocketData } from "../../../shared/models/socket.model";
import GameService from "../services/GameService";
import UserService from "../services/UserService";
import { TimerData } from "../../../shared/models/game.model";
import { emitWelcomeMessage } from "../utils/emitMessages";

export default (socket: Socket) => {
	//User join listener
	socket.on(GameMsg.join, (userData: ClientUserData) => {
		//Join incomming user to the game
		GameService.joinGame(userData)
			.then((game) => {
				//If joins correctly, save it to the users Array
				UserService.saveUser({
					...userData,
					socketId: socket.id,
				})
					.then(() => {
						//Emit welcome message
						console.log("Game joined", game);

						//Join socket to roomID
						socket.join(userData.roomId);

						//Emit game data to all users
						socket.emit(GameMsg.join, game);
						socket.broadcast.to(game.roomId).emit(GameMsg.join, game);

						//Emit welcome message
						emitWelcomeMessage(socket, userData);
					})
					.catch((error) => {
						//Emit error
						console.error(error.message);
						socket.emit(GameMsg.join, { error: error.message });
					});
			})
			.catch((error) => {
				//Emit error
				console.error(error.message);
				socket.emit(GameMsg.join, { error: error.message });
			});
	});

	socket.on(GameMsg.leave, (userData: ClientUserData) => {
		GameService.leaveGame(userData)
			.then((game) => {
				console.log("LEAVING GAME", game);
				socket.emit(GameMsg.leave, game);
				socket.leave(userData.roomId);

				UserService.removeUserBySocketId(socket.id);
			})
			.catch((error) => {
				socket.emit(GameMsg.leave, { error: error.message });
			});
	});

	socket.on(GameMsg.start, (userData: ClientUserData) => {
		GameService.startGame(userData)
			.then((game) => {
				console.log("Game started");
				socket.emit(GameMsg.start, game);
				socket.broadcast.to(userData.roomId).emit(GameMsg.start, game);
			})
			.catch((error) => {
				console.error(error);
				socket.emit(GameMsg.start, { error: error.message });
			});
	});

	socket.on(GameMsg.finishTurn, (userData: ClientUserData) => {
		GameService.finishTurn(userData)
			.then((game) => {
				console.log("Turn finished by", userData.username);
				socket.emit(GameMsg.finishTurn, game);
				socket.broadcast.to(userData.roomId).emit(GameMsg.finishTurn, game);
			})
			.catch((error) => {
				console.error(error);
				socket.emit(GameMsg.finishTurn, { error: error.message });
			});
	});

	socket.on(GameMsg.tickTimer, (timerData: SocketData<TimerData>) => {
		socket.broadcast
			.to(timerData.userData.roomId)
			.emit(GameMsg.tickTimer, timerData);
	});

	return socket;
};
