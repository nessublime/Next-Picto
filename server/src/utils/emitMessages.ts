import { Socket } from "socket.io";
import { ChatMsg } from "../../../shared/messages/chat.message";
import { ClientChatData } from "../../../shared/models/chat.model";
import { SocketData } from "../../../shared/models/socket.model";
import { ClientUserData } from "../../../shared/models/user.model";

export function emitByeMessage(socket: Socket, userData: ClientUserData) {
	const msg: SocketData<ClientChatData> = {
		userData: {
			roomId: userData.roomId,
			userId: "bootId",
			username: "Next Picto",
		},
		msgData: {
			isMine: false,
			text: `${userData.username} has left the game`,
		},
	};

	socket.broadcast.to(userData.roomId).emit(ChatMsg.message, msg);
}

export function emitWelcomeMessage(socket: Socket, userData: ClientUserData) {
	const msg: SocketData<ClientChatData> = {
		userData: {
			roomId: userData.roomId,
			userId: "bootId",
			username: "Next Picto",
		},
		msgData: {
			isMine: false,
			text: `Welcome to room ${userData.roomId}`,
		},
	};

	socket.emit(ChatMsg.message, msg);

	msg.msgData.text = `${userData.username} has joined the room`;
	socket.broadcast.to(userData.roomId).emit(ChatMsg.message, msg);
}
