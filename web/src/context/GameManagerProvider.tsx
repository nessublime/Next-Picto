import React, { createContext, useContext, useEffect, useState } from "react";
import { GameMsg } from "../../../shared/messages/game.message";
import { GameData } from "../../../shared/models/game.model";
import { SocketContext } from "./SocketProvider";
import { UserContext } from "./UserProvider";

interface IGameManagerContext {
	gameData: GameData;
	setGameData: React.Dispatch<React.SetStateAction<GameData>>;
	onStartGame: () => void;
	isMyTurn: () => boolean;
	isUserHost: () => boolean;
}

export const GameManagerContext = createContext<IGameManagerContext>(
	{} as IGameManagerContext
);

export const GameManagerProvider: React.FC = ({ children }) => {
	const { startGame } = useContext(SocketContext);
	const { user } = useContext(UserContext);

	const [gameData, setGameData] = useState<GameData>();

	const isUserHost = () => {
		return gameData.host === user.userId;
	};

	const isMyTurn = () => {
		return gameData.turnOf === user.userId;
	};

	const onStartGame = () => {
		startGame();
	};

	return (
		<GameManagerContext.Provider
			value={{ gameData, setGameData, onStartGame, isMyTurn, isUserHost }}
		>
			{children}
		</GameManagerContext.Provider>
	);
};
