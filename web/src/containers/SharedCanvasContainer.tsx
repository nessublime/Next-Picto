import React, { useContext, useEffect } from "react";
import Canvas from "../components/Atoms/Canvas";
import { BoardContext } from "../context/BoardProvider";
import { SocketContext } from "../context/SocketProvider";
import { DrawMsg } from "../../../shared/messages/draw.message";
import { DrawData } from "../../../shared/models/draw.model";
import { SocketData } from "../../../shared/models/socket.model";
import { GameManagerContext } from "../context/GameManagerProvider";
const SharedCanvasContainer: React.FC = () => {
	const {
		draw,
		startDrawing,
		finishDrawing,
		isDrawing,
		setIsDrawing,
		drawSettings,
	} = useContext(BoardContext);
	const { isMyTurn } = useContext(GameManagerContext);
	const { socket, createMessage, roomId } = useContext(SocketContext);

	useEffect(() => {
		socket.on(DrawMsg.draw, (msg: SocketData<DrawData>) => draw(msg.msgData));
		socket.on(DrawMsg.draw_start, (msg: SocketData<DrawData>) =>
			startDrawing(msg.msgData)
		);
		socket.on(DrawMsg.draw_finish, finishDrawing);

		return () => {
			socket.off(DrawMsg.draw);
			socket.off(DrawMsg.draw_start);
			socket.off(DrawMsg.draw_finish);
		};
	}, []);

	const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (!isMyTurn()) return;
		if (!isDrawing) return;
		const { offsetX, offsetY } = e.nativeEvent;
		const msgData: DrawData = {
			x: offsetX,
			y: offsetY,
		};
		draw(msgData);

		//Emit message
		const msg: SocketData<DrawData> = {
			userData: createMessage(roomId),
			msgData,
		};
		socket.emit(DrawMsg.draw, msg);
	};

	const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (!isMyTurn()) return;
		const { offsetX, offsetY } = e.nativeEvent;
		const msgData: DrawData = {
			x: offsetX,
			y: offsetY,
			color: drawSettings.color,
			width: drawSettings.width,
		};
		setIsDrawing(true);
		startDrawing(msgData);

		//Emit message
		const msg: SocketData<DrawData> = {
			userData: createMessage(roomId),
			msgData,
		};
		socket.emit(DrawMsg.draw_start, msg);
	};

	const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (!isMyTurn()) return;
		const { offsetX, offsetY } = e.nativeEvent;
		const msgData: DrawData = {
			x: offsetX,
			y: offsetY,
		};

		setIsDrawing(false);
		finishDrawing();

		//Emit message
		const msg: SocketData<DrawData> = {
			userData: createMessage(roomId),
			msgData,
		};
		socket.emit(DrawMsg.draw_finish, msg);
	};

	const onMouseOut = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		const { offsetX, offsetY } = e.nativeEvent;
		const msgData: DrawData = {
			x: offsetX,
			y: offsetY,
		};
		if (!isDrawing) return;
		setIsDrawing(false);
		finishDrawing();

		//Emit message
		const msg: SocketData<DrawData> = {
			userData: createMessage(roomId),
			msgData,
		};
		socket.emit(DrawMsg.draw_finish, msg);
	};

	return (
		<Canvas
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onMouseOut={onMouseOut}
		/>
	);
};

export default SharedCanvasContainer;
