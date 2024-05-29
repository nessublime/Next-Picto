import { Socket } from "socket.io";
import { DrawMsg } from "../../../shared/messages/draw.message";
import { DrawData } from "../../../shared/models/draw.model";
import { SocketData } from "../../../shared/models/socket.model";

export default (socket: Socket) => {
	socket.on(DrawMsg.draw, (msg: SocketData<DrawData>) => {
		socket.broadcast.to(msg.userData.roomId).emit(DrawMsg.draw, msg);
	});

	socket.on(DrawMsg.draw_start, (msg: SocketData<DrawData>) => {
		console.log(DrawMsg.draw_start);
		socket.broadcast.to(msg.userData.roomId).emit(DrawMsg.draw_start, msg);
	});

	socket.on(DrawMsg.draw_finish, (msg: SocketData<DrawData>) => {
		console.log("finishdraw");
		socket.broadcast.to(msg.userData.roomId).emit(DrawMsg.draw_finish);
	});

	socket.on(DrawMsg.canvas_clear, (msg: SocketData<DrawData>) => {
		console.log("clear_canvas");
		socket.broadcast.to(msg.userData.roomId).emit(DrawMsg.canvas_clear);
	});
};
