import React, { useContext } from "react";
import UserList from "../components/Molecules/UserList";
import { GameManagerContext } from "../context/GameManagerProvider";

const UserListContainer = () => {
	const { gameData } = useContext(GameManagerContext);

	return <UserList users={gameData.users} />;
};

export default UserListContainer;
