import React, { useContext, useEffect, useRef, useState } from "react";
import { GameMsg } from "../../../shared/messages/game.message";
import { TimerData } from "../../../shared/models/game.model";
import { SocketData } from "../../../shared/models/socket.model";
import Timer from "../components/Atoms/Timer";
import { GameManagerContext } from "../context/GameManagerProvider";
import { SocketContext } from "../context/SocketProvider";

const TIMEOUT_TOTAL = 10;

const TimerContainer: React.FC = () => {
	const { gameData, isMyTurn } = useContext(GameManagerContext);
	const { socket, createMessage, roomId } = useContext(SocketContext);

	const [timer, setTimer] = useState<number>(TIMEOUT_TOTAL);
	const intervalId = useRef<NodeJS.Timeout>();

	//Do countdown on timer
	const countDown = () => {
		if (timer > 0) {
			const timerMsg: SocketData<TimerData> = {
				userData: createMessage(roomId),
				msgData: {
					timerValue: timer,
				},
			};
			socket.emit(GameMsg.tickTimer, timerMsg);
			return;
		}

		clearInterval(intervalId.current);
		setTimer(TIMEOUT_TOTAL);
		socket.emit(GameMsg.finishTurn, createMessage(roomId));
	};

	//Set socket timer listeners on component mount
	useEffect(() => {
		socket.on(GameMsg.tickTimer, (timerMsg: SocketData<TimerData>) => {
			if (!timerMsg || !timerMsg.msgData) return;
			setTimer(timerMsg.msgData.timerValue);
		});

		return () => {
			socket.off(GameMsg.tickTimer);
		};
	}, []);

	//Set countdown interval when gameData changes
	useEffect(() => {
		if (!gameData || !isMyTurn()) return;

		intervalId.current = setInterval(
			() => setTimer((timer) => timer - 1),
			1000
		);

		return () => {
			clearInterval(intervalId.current);
			setTimer(TIMEOUT_TOTAL);
		};
	}, [gameData.turnOf]);

	//Count down when timer changes
	useEffect(() => {
		if (!isMyTurn()) return;
		countDown();
	}, [timer]);

	return <Timer timer={timer} />;
};

export default TimerContainer;
