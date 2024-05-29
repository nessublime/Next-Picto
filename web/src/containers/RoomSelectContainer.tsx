import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/UserProvider";
import { nanoid } from "nanoid";
import { SocketContext } from "../context/SocketProvider";
import RoomSelect from "../components/Molecules/RoomSelect";

const RoomSelectContainer: React.FC = () => {
	const { user, setUser, saveUserData } = useContext(UserContext);
	const { createGame } = useContext(SocketContext);

	const [joinedRoomId, setJoinedRoomId] = useState<string>("");
	const [error, setError] = useState<boolean>(false);

	const router = useRouter();

	const onCreate = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const roomId = nanoid(8);

		saveUserData();
		createGame(roomId).then(async (res) => {
			const data = await res.json();
			console.log(data, res.status);
			if (res.status === 400) {
				setError(true);
				return;
			}
			console.log("Game created");
			router.push(`/${roomId}`);
		});
	};

	const onJoin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		saveUserData();
		router.push(`/${joinedRoomId}`);
	};

	const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			username: event.target.value,
		});
	};

	const handleJoinedRoomId = (event: React.ChangeEvent<HTMLInputElement>) => {
		setJoinedRoomId(event.target.value);
	};

	return (
		<RoomSelect
			onCreate={onCreate}
			onJoin={onJoin}
			user={user}
			joinedRoomId={joinedRoomId}
			handleUsername={handleUsername}
			handleJoinedRoomId={handleJoinedRoomId}
			error={error}
		/>
	);
};

export default RoomSelectContainer;
