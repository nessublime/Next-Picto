import React from "react";
import styles from "./index.module.css";

interface Props {
	timer: number;
}

const Timer: React.FC<Props> = ({ timer }) => {
	return (
		<div className={styles.container}>
			<h1>{timer}</h1>
		</div>
	);
};

export default Timer;
