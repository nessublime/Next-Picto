import React from "react";
import RoomSelectContainer from "../../../containers/RoomSelectContainer";
import styles from "./index.module.css";

const HomeComponent: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<h1>Next Picto</h1>
			<RoomSelectContainer />
		</div>
	);
};

export default HomeComponent;
