import React from "react";
import GameContainer from "../../../containers/GameContainer";
import GameEditorContainer from "../../../containers/GameEditorContainer";
import styles from "./index.module.css";

interface Props {
	isStarted: boolean;
}

const GameRoom: React.FC<Props> = ({ isStarted }) => {
	return (
		<div className={styles["container"]}>
			{isStarted ? <GameContainer /> : <GameEditorContainer />}
		</div>
	);
};

export default GameRoom;
