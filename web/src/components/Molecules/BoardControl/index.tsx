import React from "react";
import styles from "./index.module.css";

interface Props {
	setDrawSettings: React.Dispatch<
		React.SetStateAction<{
			color: string;
			width: number;
		}>
	>;
	drawSettings: {
		color: string;
		width: number;
	};
	onCanvasClear: () => any;
}

const BoardControl: React.FC<Props> = ({
	drawSettings,
	setDrawSettings,
	onCanvasClear,
}) => {
	return (
		<div className={styles["container"]}>
			<input
				type="range"
				min="5"
				max="50"
				onChange={(e) =>
					setDrawSettings({
						...drawSettings,
						width: parseInt(e.target.value),
					})
				}
				value={drawSettings.width}
			/>
			<input
				type="color"
				onChange={(e) =>
					setDrawSettings({
						...drawSettings,
						color: e.target.value,
					})
				}
				value={drawSettings.color}
			/>
			<button onClick={onCanvasClear}>Clear</button>
		</div>
	);
};

export default BoardControl;
