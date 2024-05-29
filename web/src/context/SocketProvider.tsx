import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { GameMsg } from "../../../shared/messages/game.message";
import { ClientUserData } from "../../../shared/models/user.model";
import { UserContext } from "./UserProvider";

interface Props {
	url: string;
}

interface ISocketContext {
	socket: Socket;
	setSocket: React.Dispatch<React.SetStateAction<Socket>>;
	roomId: string;
	setRoomId: React.Dispatch<React.SetStateAction<string>>;
	createMessage: (roomId: string) => ClientUserData;
	createGame: (roomId: string) => Promise<Response>;
	joinGame: () => void;
	deleteGame: (roomId: string) => void;
	leaveGame: () => void;
	startGame: () => void;
}

export const SocketContext = createContext<ISocketContext>(
	{} as ISocketContext
);

export const SocketProvider: React.FC<Props> = ({ url, children }) => {
	const [socket, setSocket] = useState<Socket>();
	const [roomId, setRoomId] = useState<string>("");
	const { user } = useContext(UserContext);

	useEffect(() => {
		const socket = io(url);
		setSocket(socket);

		return () => {
			socket.close();
		};
	}, []);

	const createMessage = (roomId: string) => {
		const msg: ClientUserData = {
			...user,
			roomId,
		};

		return msg;
	};

	const createGame = (roomId: string) => {
		// socket.emit(GameMsg.create, createMessage(roomId));
		return fetch("http://localhost:5000/game/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ userData: createMessage(roomId) }),
		});
	};

	const deleteGame = (roomId: string) => {
		// socket.emit(GameMsg.delete, createMessage(roomId));
	};

	const joinGame = () => {
		socket.emit(GameMsg.join, createMessage(roomId));
	};

	const leaveGame = () => {
		socket.emit(GameMsg.leave, createMessage(roomId));
	};

	const startGame = () => {
		socket.emit(GameMsg.start, createMessage(roomId));
	};

	return (
		<SocketContext.Provider
			value={{
				socket,
				setSocket,
				roomId,
				setRoomId,
				createMessage,
				createGame,
				deleteGame,
				joinGame,
				leaveGame,
				startGame,
			}}
		>
			{socket && children}
		</SocketContext.Provider>
	);
};
