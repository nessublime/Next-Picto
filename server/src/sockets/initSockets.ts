import { Server, Socket } from "socket.io";
import draw from "./draw";
import chat from "./chat";
import game from "./game";
import UserService from "../services/UserService";
import GameService from "../services/GameService";
import { emitByeMessage } from "../utils/emitMessages";
import { GameMsg } from "../../../shared/messages/game.message";

export default (io: Server) => {
	io.on("connection", (socket: Socket) => {
		console.log("New WS connection", socket.id);

		draw(socket);
		chat(socket);
		game(socket);

		socket.on("disconnect", () => {
			console.log("Closed connection with ", socket.id);
			UserService.removeUserBySocketId(socket.id)
				.then((user) => {
					console.log("Removing user", user);
					const clientUserData = {
						roomId: user.roomId,
						userId: user.userId,
						username: user.username,
					};
					GameService.leaveGame(clientUserData).then((game) => {
						//Broadcast game data
						socket.broadcast.to(game.roomId).emit(GameMsg.leave, game);
						//Emit bye message
						emitByeMessage(socket, clientUserData);
					});
				})
				.catch(() => console.error("User does not exist"));
		});
	});
};
