import React, { useContext } from "react";
import GuessWordContainer from "../../../containers/GuessWordContainer";
import TimerContainer from "../../../containers/TimerContainer";
import UserListContainer from "../../../containers/UserListContainer";
import { GameManagerContext } from "../../../context/GameManagerProvider";
import Panel from "../Panel";
import styles from "./index.module.css";

const Game = () => {
	const { isMyTurn } = useContext(GameManagerContext);
	return (
		<div className={styles["container"]}>
			<TimerContainer />
			<GuessWordContainer />
			<Panel />
			<UserListContainer />
			{!isMyTurn() && <div>IM DISABLED</div>}
		</div>
	);
};

export default Game;
