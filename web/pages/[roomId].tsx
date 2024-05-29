import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import GameRoomContainer from "../src/containers/GameRoomContainer";
import { GameManagerProvider } from "../src/context/GameManagerProvider";
import { SocketContext } from "../src/context/SocketProvider";

const Example: React.FC = () => {
	const { setRoomId } = useContext(SocketContext);
	const { query } = useRouter();

	useEffect(() => {
		const roomId = query.roomId as string;
		if (!roomId) return;
		setRoomId(roomId);

		return () => {
			setRoomId("");
		};
	}, [query]);

	return (
		<GameManagerProvider>
			<GameRoomContainer />
		</GameManagerProvider>
	);
};

export default Example;
