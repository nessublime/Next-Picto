import React from "react";
import { UserGameData } from "../../../../../shared/models/game.model";
import styles from "./index.module.css";

interface Props {
	user: UserGameData;
}

const User: React.FC<Props> = ({ user }) => {
	return (
		<div className={styles.container}>
			<h4>{user.username}</h4>
			<h4>{user.points}</h4>
			<h5>{user.userId}</h5>
		</div>
	);
};

export default User;
