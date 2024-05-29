import React from "react";
import ChatContainer from "../../../containers/ChatContainer";
import Board from "../Board";
import styles from "./index.module.css";

const Panel: React.FC = () => {
	return (
		<div className={styles["container"]} style={{ maxHeight: "800px" }}>
			<Board />
			<div className={styles["chat-container"]}>
				<ChatContainer />
			</div>
		</div>
	);
};

export default Panel;
