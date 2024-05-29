import React from "react";
import SharedBoardControlContainer from "../../../containers/SharedBoardContainer";
import SharedCanvasContainer from "../../../containers/SharedCanvasContainer";
import { BoardProvider } from "../../../context/BoardProvider";
import styles from "./styles.module.css";

const Board: React.FC = () => {
	return (
		<BoardProvider>
			<div className={styles["container"]}>
				<SharedCanvasContainer />
				<SharedBoardControlContainer />
			</div>
		</BoardProvider>
	);
};

export default Board;
