import React from "react";
import ChatContainer from "../../../containers/ChatContainer";
import UserListContainer from "../../../containers/UserListContainer";
import styles from "./index.module.css";

interface Props {
	onStartGame: any;
	isUserHost: boolean;
}

const GameEditor: React.FC<Props> = ({ onStartGame, isUserHost }) => {
	return (
		<div className={styles["container"]}>
			<button
				className={styles["main-button"]}
				onClick={onStartGame}
				disabled={!isUserHost}
			>
				Start Game
			</button>
			<div className={styles["chat-container"]}>
				<ChatContainer />
			</div>
			<UserListContainer />
		</div>
	);
};

export default GameEditor;
