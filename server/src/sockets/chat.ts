import { Socket } from "socket.io";
import GameService from "../services/GameService";
import { ChatMsg } from "../../../shared/messages/chat.message";
import { ClientChatData } from "../../../shared/models/chat.model";
import { SocketData } from "../../../shared/models/socket.model";
import { GameMsg } from "../../../shared/messages/game.message";

export default (socket: Socket) => {
	socket.on(ChatMsg.message, (msg: SocketData<ClientChatData>) => {
		socket.broadcast.to(msg.userData.roomId).emit(ChatMsg.message, msg);
		GameService.checkGuessWord(msg.userData, msg.msgData.text)
			.then((game) => {
				socket.broadcast.to(game.roomId).emit(GameMsg.finishTurn, game);
				socket.emit(GameMsg.finishTurn, game);
			})
			.catch((error: Error) => console.log(error.message));
	});
};
