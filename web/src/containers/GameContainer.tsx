import React, { useContext, useEffect } from "react";
import { GameMsg } from "../../../shared/messages/game.message";
import Game from "../components/Organisms/Game";
import { GameManagerContext } from "../context/GameManagerProvider";
import { SocketContext } from "../context/SocketProvider";

const GameContainer: React.FC = () => {
	const { socket } = useContext(SocketContext);
	const { setGameData } = useContext(GameManagerContext);
	useEffect(() => {
		socket.on(GameMsg.finishTurn, (msg) => {
			if (!msg.error) {
				console.log("Turn finished, new game data =>", msg);
				setGameData(msg);
			}
		});

		return () => {
			socket.off(GameMsg.finishTurn);
		};
	}, []);
	return <Game />;
};

export default GameContainer;
